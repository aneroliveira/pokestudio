import fs from "node:fs";
import path from "node:path";
import type { TipoPokemon } from "@/models/pokemon";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import {
  FONTE_POKEDEX,
  medirEscala,
  resolverImagensForma,
} from "./assetsGO";

// Gera data/megas.json com o roster de Mega Evoluções (e Primal) do Pokémon
// GO — nome, tipos, categoria e base stats — a partir do mirror pokemon-go-api.
// RFC-002: roster é dado oficial/externo, nunca curadoria do studio.
// Uso: npx tsx scripts/gerarMegas.ts

console.log("===================================");
console.log(" Gerador do roster de Megas do GO");
console.log("===================================");

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

/** "MEWTWO_MEGA_X" → "MEGA_X", "VICTREEBEL_MEGA" → "MEGA", "KYOGRE_PRIMAL" → "PRIMAL". */
function extrairTokenForma(id: string): string | undefined {
  const match = id.match(/(MEGA(?:_X|_Y)?|PRIMAL)$/);
  return match ? match[1] : undefined;
}

/** Imagens por forma da Mega (ver resolverImagensForma em assetsGO.ts). */
async function resolverImagens(
  id: string,
  dexNr: number,
  fallback: { imagem?: string; imagemShiny?: string },
): Promise<{ imagem?: string; imagemShiny?: string }> {
  const token = extrairTokenForma(id);
  if (!token) return fallback;
  return resolverImagensForma(dexNr, token, fallback);
}

async function main() {
  const response = await fetch(FONTE_POKEDEX);

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
