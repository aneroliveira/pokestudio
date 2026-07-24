import type { TipoPokemon } from "@/models/pokemon";
import { RELACOES_DEFENSIVAS } from "@/constants/typeChart";

/**
 * Efetividade OFENSIVA dos tipos — RFC-002.
 *
 * Não persistimos (nem declaramos) uma tabela ofensiva à parte: tudo aqui é
 * derivado por inversão de `RELACOES_DEFENSIVAS`, mantendo o typeChart
 * defensivo como única fonte de verdade das relações de tipo.
 */

// Multiplicadores (relações da série principal, mesmos usados em
// calcularDerivados) — suficientes para ranquear por efetividade de tipo.
const FATOR_SUPER_EFETIVO = 2;
const FATOR_POUCO_EFETIVO = 0.5;
const FATOR_SEM_EFEITO = 0;

/**
 * Fator de dano de um tipo atacante contra um único tipo defensor, lido
 * diretamente do chart defensivo do defensor.
 */
function fatorContraTipo(
  atacante: TipoPokemon,
  defensor: TipoPokemon,
): number {
  const relacoes = RELACOES_DEFENSIVAS[defensor];
  if (relacoes.no_damage_from.includes(atacante)) return FATOR_SEM_EFEITO;
  if (relacoes.double_damage_from.includes(atacante)) return FATOR_SUPER_EFETIVO;
  if (relacoes.half_damage_from.includes(atacante)) return FATOR_POUCO_EFETIVO;
  return 1;
}

/**
 * Multiplicador de dano de um tipo atacante contra um alvo de um ou dois
 * tipos (produto dos fatores individuais):
 * - `> 1` super efetivo no total (ex.: 2, 4);
 * - `< 1` resistido (ex.: 0.5, 0.25);
 * - `0` imune.
 */
export function calcularEfetividadeOfensiva(
  atacante: TipoPokemon,
  tiposAlvo: TipoPokemon[],
): number {
  return tiposAlvo.reduce(
    (multiplicador, defensor) =>
      multiplicador * fatorContraTipo(atacante, defensor),
    1,
  );
}

/**
 * Relações ofensivas de um tipo, derivadas por inversão do chart defensivo.
 * Útil para exibição e para o ranking de Megas (RFC-002 etapa 3).
 *
 * Para um tipo atacante:
 * - `superEfetivo`: tipos que recebem dano dobrado dele;
 * - `poucoEfetivo`: tipos que recebem metade;
 * - `semEfeito`: tipos imunes a ele.
 */
export type RelacoesOfensivas = {
  superEfetivo: TipoPokemon[];
  poucoEfetivo: TipoPokemon[];
  semEfeito: TipoPokemon[];
};

const TODOS_OS_TIPOS = Object.keys(RELACOES_DEFENSIVAS) as TipoPokemon[];

function inverterChartDefensivo(): Record<TipoPokemon, RelacoesOfensivas> {
  const ofensivo = {} as Record<TipoPokemon, RelacoesOfensivas>;

  for (const atacante of TODOS_OS_TIPOS) {
    ofensivo[atacante] = {
      superEfetivo: [],
      poucoEfetivo: [],
      semEfeito: [],
    };
  }

  for (const defensor of TODOS_OS_TIPOS) {
    const relacoes = RELACOES_DEFENSIVAS[defensor];
    for (const atacante of relacoes.double_damage_from) {
      ofensivo[atacante].superEfetivo.push(defensor);
    }
    for (const atacante of relacoes.half_damage_from) {
      ofensivo[atacante].poucoEfetivo.push(defensor);
    }
    for (const atacante of relacoes.no_damage_from) {
      ofensivo[atacante].semEfeito.push(defensor);
    }
  }

  return ofensivo;
}

export const RELACOES_OFENSIVAS: Record<TipoPokemon, RelacoesOfensivas> =
  inverterChartDefensivo();
