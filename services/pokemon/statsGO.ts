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
