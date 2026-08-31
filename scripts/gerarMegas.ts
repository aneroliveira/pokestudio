import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import type { TipoPokemon } from "@/models/pokemon";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";

// Gera data/megas.json com o roster de Mega Evoluções (e Primal) do Pokémon
// GO — nome, tipos, categoria e base stats — a partir do mirror pokemon-go-api.
// RFC-002: roster é dado oficial/externo, nunca curadoria do studio.
// Uso: npx tsx scripts/gerarMegas.ts

console.log("===================================");
console.log(" Gerador do roster de Megas do GO");
console.log("===================================");

const FONTE =
  "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json";

interface MegaBruto {
  names?: { English?: string };
  stats?: { attack: number; defense: number; stamina: number };
  primaryType?: { type: string };
  secondaryType?: { type: string } | null;
  assets?: { image?: string; shinyImage?: string };
}

interface EntradaBruta {
  dexNr: number;
  megaEvolutions?: Record<string, MegaBruto>;
}

interface EntradaMega {
  id: string;
  nome: string;
  numeroBase: string;
  categoria: "Mega" | "Primal";
  tipos: TipoPokemon[];
  stats: { attack: number; defense: number; stamina: number };
  imagem?: string;
  imagemShiny?: string;
  /** Fator pra compensar a moldura do ícone de Mega ter menos "preenchimento"
   *  que a arte oficial da forma base (ver medirEscala) — aplicado como
   *  transform: scale() na UI. Omitido (= 1) quando a medição falha. */
  escala?: number;
}

function mapearTipo(bruto: string): TipoPokemon {
  const chave = bruto.replace("POKEMON_TYPE_", "").toLowerCase();
  const tipo = TIPOS_POKEMON[chave];
  if (!tipo) {
    throw new Error(`Tipo desconhecido vindo do mirror: "${bruto}"`);
  }
  return tipo;
}

function mapearTipos(mega: MegaBruto): TipoPokemon[] {
  const tipos: TipoPokemon[] = [];
  if (mega.primaryType?.type) tipos.push(mapearTipo(mega.primaryType.type));
  if (mega.secondaryType?.type) tipos.push(mapearTipo(mega.secondaryType.type));
  return tipos;
}

const BASE_ASSETS = "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon";

/** "MEWTWO_MEGA_X" → "MEGA_X", "VICTREEBEL_MEGA" → "MEGA", "KYOGRE_PRIMAL" → "PRIMAL". */
function extrairTokenForma(id: string): string | undefined {
  const match = id.match(/(MEGA(?:_X|_Y)?|PRIMAL)$/);
  return match ? match[1] : undefined;
}

async function existeAsset(url: string): Promise<boolean> {
  try {
    const resposta = await fetch(url, { method: "HEAD" });
    return resposta.ok;
  } catch {
    return false;
  }
}

/**
 * O mirror às vezes aponta `assets.image`/`shinyImage` de uma Mega pro
 * ícone BASE da espécie em vez do ícone específico da forma — bug visto
 * em Mewtwo X/Y e Victreebel, confirmado manualmente (o arquivo por forma
 * existe e é diferente do base). Mas nem toda forma tem arte própria: o
 * Raichu X/Y, por exemplo, realmente não tem (404 nos arquivos por forma,
 * o base é a arte correta mesmo). Por isso não dá pra confiar cegamente
 * nem no campo do mirror nem em montar a URL por forma sempre — confere
 * se o arquivo por forma existe de verdade (HEAD) e só troca quando existe.
 */
async function resolverImagens(
  id: string,
  dexNr: number,
  fallback: { imagem?: string; imagemShiny?: string },
): Promise<{ imagem?: string; imagemShiny?: string }> {
  const token = extrairTokenForma(id);
  if (!token) return fallback;

  const candidataImagem = `${BASE_ASSETS}/pm${dexNr}.f${token}.icon.png`;
  const candidataShiny = `${BASE_ASSETS}/pm${dexNr}.f${token}.s.icon.png`;

  const [imagemExiste, shinyExiste] = await Promise.all([
    existeAsset(candidataImagem),
    existeAsset(candidataShiny),
  ]);

  return {
    imagem: imagemExiste ? candidataImagem : fallback.imagem,
    imagemShiny: shinyExiste ? candidataShiny : fallback.imagemShiny,
  };
}

/**
 * Preenchimento (maior lado do personagem ÷ lado do canvas) da arte oficial
 * usada como imagem normal do Pokémon (`pokemon.oficial.imagem`) — medido
 * com sharp em 5 espécies bem diferentes (Victreebel, Mewtwo, Onix,
 * Diglett, Gengar): as 5 deram exatamente 0.907, ou seja, é uma margem
 * fixa da própria arte oficial, não algo que varia por espécie.
 */
const PREENCHIMENTO_BASE = 0.907;

/** Preenchimento mínimo/máximo aceitos — fora disso a medição provavelmente
 *  falhou (ícone quase todo transparente, erro de decode) e não deve
 *  gerar um fator de escala absurdo. */
const ESCALA_MIN = 0.75;
const ESCALA_MAX = 1.4;

/**
 * Mede quanto do canvas do ícone de Mega é ocupado pelo personagem e
 * devolve o fator de escala pra igualar ao preenchimento da arte oficial —
 * os ícones de Mega vêm de um estilo de arte diferente (ícone de jogo, não
 * ilustração oficial) e cada um tem uma margem própria, sem padrão fixo
 * (confirmado: Victreebel quase igual à base, Mewtwo X ~10% menor, Gengar
 * ~2% maior) — por isso mede por Mega em vez de aplicar um fator único.
 */
async function medirEscala(url: string): Promise<number | undefined> {
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) return undefined;

    const buffer = Buffer.from(await resposta.arrayBuffer());
    const { data, info } = await sharp(buffer)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    const { width, height } = info;
    let minX = width, minY = height, maxX = -1, maxY = -1;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < 0) return undefined;

    const conteudo = Math.max(maxX - minX + 1, maxY - minY + 1);
    const preenchimento = conteudo / Math.max(width, height);
    if (preenchimento <= 0) return undefined;

    const escala = PREENCHIMENTO_BASE / preenchimento;
    return Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, Number(escala.toFixed(3))));
  } catch {
    return undefined;
  }
}

async function main() {
  const response = await fetch(FONTE);

  if (!response.ok) {
    throw new Error("Erro ao buscar a pokemon-go-api.");
  }

  const dados = (await response.json()) as EntradaBruta[];

  const candidatas: { id: string; dexNr: number; mega: MegaBruto }[] = [];

  for (const entrada of dados) {
    if (!entrada.megaEvolutions) continue;

    for (const [id, mega] of Object.entries(entrada.megaEvolutions)) {
      if (!mega.stats || !mega.primaryType) continue;
      candidatas.push({ id, dexNr: entrada.dexNr, mega });
    }
  }

  console.log(`Conferindo imagens por forma de ${candidatas.length} Megas...`);

  const megas: EntradaMega[] = await Promise.all(
    candidatas.map(async ({ id, dexNr, mega }) => {
      const imagens = await resolverImagens(id, dexNr, {
        imagem: mega.assets?.image,
        imagemShiny: mega.assets?.shinyImage,
      });

      const escala = imagens.imagem
        ? await medirEscala(imagens.imagem)
        : undefined;

      return {
        id,
        nome: mega.names?.English ?? id,
        numeroBase: `#${dexNr}`,
        categoria: id.includes("PRIMAL") ? "Primal" as const : "Mega" as const,
        tipos: mapearTipos(mega),
        stats: {
          attack: mega.stats!.attack,
          defense: mega.stats!.defense,
          stamina: mega.stats!.stamina,
        },
        ...imagens,
        ...(escala !== undefined ? { escala } : {}),
      };
    }),
  );

  megas.sort(
    (a, b) =>
      Number(a.numeroBase.replace("#", "")) -
        Number(b.numeroBase.replace("#", "")) ||
      a.id.localeCompare(b.id),
  );

  const outputPath = path.resolve(process.cwd(), "data/megas.json");
  fs.writeFileSync(outputPath, JSON.stringify(megas, null, 2));

  console.log(`✔ ${megas.length} Megas geradas em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
