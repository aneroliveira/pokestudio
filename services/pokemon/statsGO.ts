import { CPM } from "@/constants/cpm";
import goStats from "@/data/goStats.json";

export interface BaseStatsGO {
  attack: number;
  defense: number;
  stamina: number;
}

/**
 * Base stats do GO não são deriváveis da PokéAPI (Niantic ajusta os
 * valores manualmente; a fórmula de conversão dos stats da série
 * principal erra por ~20%). Fonte: pokemon-go-api (GAME_MASTER da
 * comunidade), gerada em data/goStats.json (scripts/gerarGoStats.ts).
 * Cobre apenas formas base — Megas/formas alternativas não têm entrada
 * e devem usar override manual no studio.
 */
export function obterBaseStatsGO(dexNr: number): BaseStatsGO | undefined {
  return (goStats as Record<string, BaseStatsGO>)[String(dexNr)];
}

/**
 * CP do Pokémon GO: floor( (Atk+IVa) · sqrt(Def+IVd) · sqrt(Sta+IVs) · CPM² / 10 )
 */
export function calcularCP(
  base: BaseStatsGO,
  ivs: { atk: number; def: number; sta: number },
  nivel: number,
): number {
  const cpm = CPM[String(nivel)];
  if (!cpm) return 0;

  const atk = base.attack + ivs.atk;
  const def = base.defense + ivs.def;
  const sta = base.stamina + ivs.sta;

  return Math.floor(
    (atk * Math.sqrt(def) * Math.sqrt(sta) * cpm * cpm) / 10,
  );
}

export interface HundosCalculados {
  semClima: number;
  comClima: number;
  quaseHundos: { iv98: number; iv96: number };
}

/**
 * Calcula o CP de 100% IV (raid) sem e com clima, e as referências de
 * quase-hundo (98%/96%), seguindo a convenção observada nos dados
 * originais do PokéStudio: 100% = nível 20 (sem clima) / 25 (com clima);
 * quase-hundo = 15/15/14 (98%) e 15/14/14 (96%) no nível 20.
 */
export function calcularHundos(base: BaseStatsGO): HundosCalculados {
  const hundo = { atk: 15, def: 15, sta: 15 };

  return {
    semClima: calcularCP(base, hundo, 20),
    comClima: calcularCP(base, hundo, 25),
    quaseHundos: {
      iv98: calcularCP(base, { atk: 15, def: 15, sta: 14 }, 20),
      iv96: calcularCP(base, { atk: 15, def: 14, sta: 14 }, 20),
    },
  };
}

/**
 * Calcula os hundos a partir do número da Pokédex (ex.: "#025").
 * Retorna undefined quando não há base stats na fonte (Megas, formas
 * alternativas, número vazio) — nesses casos o studio depende do
 * preenchimento manual (override).
 */
export function calcularHundosPorNumero(
  numero: string,
): HundosCalculados | undefined {
  const dexNr = Number(numero.replace("#", ""));
  if (!dexNr) return undefined;

  const base = obterBaseStatsGO(dexNr);
  if (!base) return undefined;

  return calcularHundos(base);
}

// =========================
// CP máximo por nível
// =========================

export interface NivelReferencia {
  nivel: number;
  /** De onde vem um Pokémon capturado nesse nível. */
  contexto: string;
}

/**
 * Níveis de referência do Pokémon GO, do maior para o menor — o teto de
 * nível varia conforme a origem do encontro:
 * - pesquisa de campo entrega nível 15;
 * - chefes de raid e ovos entregam nível 20 (raid com clima favorável, 25);
 * - capturas selvagens vão até o nível 30 (35 com clima favorável);
 * - nível 40 é o teto sem doce XL, e 50 o teto absoluto.
 *
 * São tetos por origem, não o nível de um exemplar qualquer: raid e ovo são
 * fixos, mas captura selvagem varia bem abaixo do teto.
 */
export const TETO_NIVEL_SELVAGEM = 30;
export const TETO_NIVEL_SELVAGEM_CLIMA = 35;

export const NIVEIS_REFERENCIA: NivelReferencia[] = [
  { nivel: 50, contexto: "Máximo (com XL)" },
  { nivel: 40, contexto: "Máximo (sem XL)" },
  { nivel: TETO_NIVEL_SELVAGEM_CLIMA, contexto: "Selvagem com clima" },
  { nivel: TETO_NIVEL_SELVAGEM, contexto: "Selvagem (teto)" },
  { nivel: 25, contexto: "Raid com clima" },
  { nivel: 20, contexto: "Raid e Ovo" },
  { nivel: 15, contexto: "Pesquisa de campo" },
];

export interface CPNivel extends NivelReferencia {
  cp: number;
}

/**
 * CP de um 100% (15/15/15) em cada nível de referência — a leitura de
 * "CP máximo por nível" usada pela comunidade para reconhecer de onde
 * veio um exemplar perfeito.
 */
export function calcularCPPorNivel(base: BaseStatsGO): CPNivel[] {
  const hundo = { atk: 15, def: 15, sta: 15 };

  return NIVEIS_REFERENCIA.map((referencia) => ({
    ...referencia,
    cp: calcularCP(base, hundo, referencia.nivel),
  }));
}

/**
 * Idem, a partir do número da Pokédex. Retorna undefined quando não há
 * base stats na fonte (Megas, formas alternativas, número vazio).
 */
export function calcularCPPorNivelPorNumero(
  numero: string,
): CPNivel[] | undefined {
  const dexNr = Number(numero.replace("#", ""));
  if (!dexNr) return undefined;

  const base = obterBaseStatsGO(dexNr);
  if (!base) return undefined;

  return calcularCPPorNivel(base);
}

// =========================
// Caçada — CP por nível, por faixa de IV
// =========================

/**
 * Faixas de IV usadas na caçada, mesma convenção do "quase hundo":
 * 100% = 15/15/15, 98% = 15/15/14, 96% = 15/14/14.
 */
export const FAIXAS_IV_CACADA = [
  { label: "100%", ivs: { atk: 15, def: 15, sta: 15 } },
  { label: "98%", ivs: { atk: 15, def: 15, sta: 14 } },
  { label: "96%", ivs: { atk: 15, def: 14, sta: 14 } },
] as const;

export type FaixaIVCacada = (typeof FAIXAS_IV_CACADA)[number]["label"];

export interface LinhaCacada {
  nivel: number;
  cps: Record<FaixaIVCacada, number>;
}

/**
 * CP de cada faixa de IV (100/98/96%), nível a nível, até o teto informado —
 * a base para "que CP eu deveria conferir se estou caçando um hundo".
 */
export function calcularCacada(
  base: BaseStatsGO,
  tetoNivel: number,
): LinhaCacada[] {
  const niveis: LinhaCacada[] = [];

  for (let nivel = 1; nivel <= tetoNivel; nivel++) {
    const cps = {} as Record<FaixaIVCacada, number>;

    for (const faixa of FAIXAS_IV_CACADA) {
      cps[faixa.label] = calcularCP(base, faixa.ivs, nivel);
    }

    niveis.push({ nivel, cps });
  }

  return niveis;
}

/**
 * Idem, a partir do número da Pokédex. Retorna undefined quando não há
 * base stats na fonte (Megas, formas alternativas, número vazio).
 */
export function calcularCacadaPorNumero(
  numero: string,
  tetoNivel: number,
): LinhaCacada[] | undefined {
  const dexNr = Number(numero.replace("#", ""));
  if (!dexNr) return undefined;

  const base = obterBaseStatsGO(dexNr);
  if (!base) return undefined;

  return calcularCacada(base, tetoNivel);
}
