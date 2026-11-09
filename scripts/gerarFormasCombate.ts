import fs from "node:fs";
import path from "node:path";
import type { TipoPokemon } from "@/models/pokemon";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import { BASE_ASSETS, FONTE_POKEDEX, existeAsset } from "./assetsGO";

// Gera data/formasCombate.json: as espécies do GO com formas que MUDAM DE
// TIPO (Zacian Herói × Espada Coroada, Rotom, Hoopa, Necrozma...), usadas
// pelo seletor "Forma" do Combate na ficha. Formas que só mudam stats
// (Deoxys, Giratina, Therian...) ficam de fora — o Combate sai igual nelas.
// Formas regionais também ficam de fora (são outro assunto).
// Nome PT-BR vem dos textos oficiais do jogo (PokeMiners).
// Uso: npx tsx scripts/gerarFormasCombate.ts [pokedex.json local]

console.log("===================================");
console.log(" Gerador de formas de combate do GO");
console.log("===================================");

const TEXTOS_PTBR =
  "https://raw.githubusercontent.com/PokeMiners/pogo_assets/master/Texts/Latest%20APK/JSON/i18n_brazilianportuguese.json";

const REGIONAL = /_(ALOLA|GALARIAN|HISUIAN|PALDEA\w*)(_|$)/;

/** Espécies cuja entrada base do mirror é só um "guarda-chuva" e não uma
 *  forma de verdade no jogo (Urshifu sem estilo não existe). */
const IGNORAR_BASE = new Set(["URSHIFU"]);

/** Espécies que mostram a miniatura da forma ao lado do seletor — só onde
 *  ver a forma acrescenta algo (curadoria da Lori; nas outras não precisa). */
const COM_MINIATURA = new Set(["ROTOM"]);

/** Nome das formas que não estão nos textos do jogo (ainda não lançadas). */
const NOMES_EXTRAS: Record<string, string> = {
  CALYREX: "Calyrex",
  CALYREX_ICE_RIDER: "Cavaleiro Glacial",
  CALYREX_SHADOW_RIDER: "Cavaleiro Espectral",
  WORMADAM_PLANT: "Manto de Planta",
};

interface FormaBruta {
  id: string;
  formId?: string;
  primaryType?: { type: string };
  secondaryType?: { type: string } | null;
  assets?: { image?: string } | null;
}

interface EntradaBruta extends FormaBruta {
  dexNr: number;
  regionForms?: Record<string, FormaBruta> | null;
}

interface FormaCombate {
  id: string;
  nome: string;
  tipos: TipoPokemon[];
  /** Ícone da forma no GO (miniatura ao lado do seletor). Omitido quando
   *  não há arte da forma publicada (ex.: Calyrex Cavaleiro Glacial). */
  imagem?: string;
}

interface EspecieFormasCombate {
  numeroBase: string;
  formas: FormaCombate[];
}

function mapearTipo(bruto: string): TipoPokemon {
  const chave = bruto.replace("POKEMON_TYPE_", "").toLowerCase();
  const tipo = TIPOS_POKEMON[chave];
  if (!tipo) throw new Error(`Tipo desconhecido vindo do mirror: "${bruto}"`);
  return tipo;
}

function mapearTipos(forma: FormaBruta): TipoPokemon[] {
  const tipos: TipoPokemon[] = [];
  if (forma.primaryType?.type) tipos.push(mapearTipo(forma.primaryType.type));
  if (forma.secondaryType?.type) tipos.push(mapearTipo(forma.secondaryType.type));
  return tipos;
}

async function carregarTextos(): Promise<Map<string, string>> {
  const resposta = await fetch(TEXTOS_PTBR);
  if (!resposta.ok) throw new Error("Erro ao buscar os textos do jogo.");

  // Formato do PokeMiners: { data: [chave, valor, chave, valor, ...] }
  const { data } = (await resposta.json()) as { data: string[] };
  const textos = new Map<string, string>();
  for (let i = 0; i < data.length; i += 2) textos.set(data[i], data[i + 1]);
  return textos;
}

/** Nome PT-BR da forma. Tenta as chaves que o jogo usa, nesta ordem:
 *  form_<especie>_<forma>, form_<forma> (Urshifu), form_<forma>_cloak e
 *  form_burmy_<forma> (Wormadam usa os mantos do Burmy). */
function nomeDaForma(
  especie: string,
  formId: string,
  textos: Map<string, string>,
): string {
  if (NOMES_EXTRAS[formId]) return NOMES_EXTRAS[formId];

  const sufixo =
    formId === especie ? "normal" : formId.slice(especie.length + 1).toLowerCase();

  const candidatas = [
    `form_${especie.toLowerCase()}_${sufixo}`,
    `form_${sufixo}`,
    `form_${sufixo}_cloak`,
    `form_burmy_${sufixo}`,
  ];

  for (const chave of candidatas) {
    const nome = textos.get(chave);
    if (nome) return nome;
  }

  throw new Error(
    `Sem nome PT-BR para ${formId} — adicione em NOMES_EXTRAS.`,
  );
}

/** Ícone da forma: o que o mirror aponta ou, sem ele, o arquivo montado à
 *  mão — `pm<dex>.f<FORMA>.icon.png` ou, no Wormadam, com o id inteiro
 *  (`fWORMADAM_PLANT`) — só se existir. O mirror às vezes aponta o ícone
 *  BASE da espécie numa forma sem arte (Ultra Necrozma): esse é descartado,
 *  pra não mostrar a forma errada. */
async function imagemDaForma(
  especie: string,
  dexNr: number,
  forma: FormaBruta,
): Promise<string | undefined> {
  const formId = forma.formId ?? forma.id;
  const iconeBase = `${BASE_ASSETS}/pm${dexNr}.icon.png`;

  if (forma.assets?.image) {
    const ehBaseNaForma = formId !== especie && forma.assets.image === iconeBase;
    return ehBaseNaForma ? undefined : forma.assets.image;
  }

  if (formId === especie) return undefined;

  const token = formId.slice(especie.length + 1);
  for (const sufixo of [token, formId]) {
    const candidata = `${BASE_ASSETS}/pm${dexNr}.f${sufixo}.icon.png`;
    if (await existeAsset(candidata)) return candidata;
  }
  return undefined;
}

async function carregarPokedex(local?: string): Promise<EntradaBruta[]> {
  if (local) {
    console.log(`→ lendo fonte local: ${local}`);
    return JSON.parse(fs.readFileSync(local, "utf-8")) as EntradaBruta[];
  }

  console.log(`→ buscando ${FONTE_POKEDEX}`);
  const response = await fetch(FONTE_POKEDEX);
  if (!response.ok) throw new Error("Erro ao buscar a pokemon-go-api.");
  return (await response.json()) as EntradaBruta[];
}

async function main() {
  const [dados, textos] = await Promise.all([
    carregarPokedex(process.argv[2]),
    carregarTextos(),
  ]);

  const especies: EspecieFormasCombate[] = [];

  for (const entrada of dados) {
    const alternativas = Object.values(entrada.regionForms ?? {}).filter(
      (forma) => !REGIONAL.test(forma.formId ?? forma.id),
    );
    if (alternativas.length === 0) continue;

    const chaveTipos = (forma: FormaBruta) => mapearTipos(forma).join("/");

    // A entrada base só vira forma quando é uma forma de verdade: se alguma
    // alternativa já tem os mesmos tipos, ela é só o "padrão" repetido
    // (Zacian base = Espada Coroada, Wormadam base = Manto de Planta).
    const baseRepetida = alternativas.some(
      (forma) => chaveTipos(forma) === chaveTipos(entrada),
    );
    const brutas =
      baseRepetida || IGNORAR_BASE.has(entrada.id)
        ? alternativas
        : [entrada, ...alternativas];

    if (new Set(brutas.map(chaveTipos)).size < 2) continue;

    const formas: FormaCombate[] = await Promise.all(
      brutas.map(async (forma) => {
        const formId = forma.formId ?? forma.id;
        const imagem = COM_MINIATURA.has(entrada.id)
          ? await imagemDaForma(entrada.id, entrada.dexNr, forma)
          : undefined;
        return {
          id: formId,
          nome: nomeDaForma(entrada.id, formId, textos),
          tipos: mapearTipos(forma),
          ...(imagem ? { imagem } : {}),
        };
      }),
    );

    especies.push({ numeroBase: `#${entrada.dexNr}`, formas });
  }

  especies.sort(
    (a, b) =>
      Number(a.numeroBase.slice(1)) - Number(b.numeroBase.slice(1)),
  );

  const outputPath = path.resolve(process.cwd(), "data/formasCombate.json");
  fs.writeFileSync(outputPath, JSON.stringify(especies, null, 2));

  for (const especie of especies) {
    console.log(
      `  ${especie.numeroBase}: ${especie.formas
        .map((forma) => `${forma.nome} (${forma.tipos.join("/")})`)
        .join(" · ")}`,
    );
  }
  console.log(`✔ ${especies.length} espécies geradas em: ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
