import type { TipoPokemon } from "@/models/pokemon";
import { calcularEfetividadeOfensiva } from "./efetividade";
import megasData from "@/data/megas.json";

/**
 * Uma Mega do roster do GO (data/megas.json, gerado por gerarMegas.ts).
 * Dado oficial/externo — RFC-002.
 */
export interface EntradaMega {
  id: string;
  nome: string;
  numeroBase: string;
  categoria: "Mega" | "Primal";
  tipos: TipoPokemon[];
  stats: { attack: number; defense: number; stamina: number };
}

export const MEGAS = megasData as unknown as EntradaMega[];

export interface MegaRecomendada {
  mega: EntradaMega;
  /** Melhor multiplicador de dano da Mega contra o alvo (> 1 = super efetivo). */
  efetividade: number;
  /** Tipo da Mega que atinge esse multiplicador. */
  melhorTipo: TipoPokemon;
}

export interface OpcoesRecomendacao {
  /** Quantidade máxima de Megas retornadas. Padrão: 6. */
  limite?: number;
  /** Retornar apenas Megas super efetivas (efetividade > 1). Padrão: true. */
  somenteSuperEfetivas?: boolean;
}

/**
 * Avalia uma Mega contra o alvo pelo MELHOR dos seus tipos ofensivos
 * (na prática, o tipo com STAB que o treinador usaria).
 */
function avaliarMega(
  mega: EntradaMega,
  tiposAlvo: TipoPokemon[],
): MegaRecomendada {
  let melhorTipo = mega.tipos[0];
  let efetividade = calcularEfetividadeOfensiva(melhorTipo, tiposAlvo);

  for (const tipo of mega.tipos.slice(1)) {
    const valor = calcularEfetividadeOfensiva(tipo, tiposAlvo);
    if (valor > efetividade) {
      efetividade = valor;
      melhorTipo = tipo;
    }
  }

  return { mega, efetividade, melhorTipo };
}

/**
 * Recomenda as melhores Megas para usar CONTRA um Pokémon de dados tipos.
 *
 * RFC-002 — o ranking é derivado em runtime (efetividade ofensiva de tipo),
 * nunca persistido. Ordena por efetividade desc, desempatando pelo ataque
 * (melhor atacante primeiro) e pelo nome.
 */
export function recomendarMegasContra(
  tiposAlvo: TipoPokemon[],
  opcoes: OpcoesRecomendacao = {},
): MegaRecomendada[] {
  const { limite = 6, somenteSuperEfetivas = true } = opcoes;

  if (tiposAlvo.length === 0) return [];

  const avaliadas = MEGAS.map((mega) => avaliarMega(mega, tiposAlvo));

  const filtradas = somenteSuperEfetivas
    ? avaliadas.filter((r) => r.efetividade > 1)
    : avaliadas;

  filtradas.sort(
    (a, b) =>
      b.efetividade - a.efetividade ||
      b.mega.stats.attack - a.mega.stats.attack ||
      a.mega.nome.localeCompare(b.mega.nome),
  );

  return filtradas.slice(0, limite);
}
