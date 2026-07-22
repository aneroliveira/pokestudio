import { CPM } from "@/constants/cpm";
import { calcularCP, obterBaseStatsGO, type BaseStatsGO } from "./statsGO";

export interface IVsGO {
  attack: number;
  defense: number;
  stamina: number;
}

export interface SearchIvResultado {
  nivelEstimado: number;
  comparativo: Array<{
    label: string;
    ivs: IVsGO;
    cp: number;
  }>;
}

// Boost de clima como fator flat no CP — heurística usada só nesta
// ferramenta (busca reversa a partir de um CP arbitrário informado pelo
// usuário, sem nível de captura conhecido). Não confundir com a
// convenção L20/L25 usada em calcularHundos, que é específica de
// raids/spawn com nível de captura conhecido.
const CLIMA_FACTOR = 1.08;

// Níveis válidos da tabela CPM (1 a 51.5, passo 0.5), ordenados.
const NIVEIS_CPM = Object.keys(CPM)
  .map(Number)
  .sort((a, b) => a - b);

function calcularCpNoNivel(
  base: BaseStatsGO,
  nivel: number,
  ivs: IVsGO,
  comClima: boolean,
): number {
  const cp = calcularCP(
    base,
    { atk: ivs.attack, def: ivs.defense, sta: ivs.stamina },
    nivel,
  );

  return comClima ? Math.round(cp * CLIMA_FACTOR) : cp;
}

/**
 * Estima o nível (dentre os níveis válidos da tabela CPM) cujo CP calculado
 * mais se aproxima do CP informado, para as IVs dadas.
 */
export function estimarNivel(
  base: BaseStatsGO,
  cpAlvo: number,
  ivs: IVsGO,
  comClima = false,
): number {
  let melhorNivel = NIVEIS_CPM[0];
  let menorDiferenca = Infinity;

  for (const nivel of NIVEIS_CPM) {
    const cp = calcularCpNoNivel(base, nivel, ivs, comClima);
    const diferenca = Math.abs(cp - cpAlvo);

    if (diferenca < menorDiferenca) {
      menorDiferenca = diferenca;
      melhorNivel = nivel;
    }

    // CP cresce monotonicamente com o nível; assim que passar do alvo
    // e a diferença começar a aumentar, já achamos o mais próximo.
    if (cp > cpAlvo && diferenca > menorDiferenca) {
      break;
    }
  }

  return melhorNivel;
}

export function gerarResultadoSearchIv(
  numero: string,
  cpAlvo: number,
  ivs: IVsGO,
  comClima = false,
): SearchIvResultado | undefined {
  const dexNr = Number(numero.replace("#", ""));
  const base = Number.isFinite(dexNr) ? obterBaseStatsGO(dexNr) : undefined;

  if (!base) return undefined;

  const nivelEstimado = estimarNivel(base, cpAlvo, ivs, comClima);

  const benchmarks: Array<{ label: string; ivs: IVsGO }> = [
    { label: "100%", ivs: { attack: 15, defense: 15, stamina: 15 } },
    { label: "98%", ivs: { attack: 15, defense: 15, stamina: 14 } },
    { label: "96%", ivs: { attack: 15, defense: 14, stamina: 14 } },
  ];

  return {
    nivelEstimado,
    comparativo: benchmarks.map((benchmark) => ({
      label: benchmark.label,
      ivs: benchmark.ivs,
      cp: calcularCpNoNivel(base, nivelEstimado, benchmark.ivs, comClima),
    })),
  };
}

export function calcularCpParaExibicao(
  numero: string,
  nivel: number,
  ivs: IVsGO,
  comClima = false,
): number | undefined {
  const dexNr = Number(numero.replace("#", ""));
  const base = Number.isFinite(dexNr) ? obterBaseStatsGO(dexNr) : undefined;

  if (!base) return undefined;

  return calcularCpNoNivel(base, nivel, ivs, comClima);
}
