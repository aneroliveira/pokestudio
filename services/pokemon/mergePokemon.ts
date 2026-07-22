import type { Pokemon } from "@/models/pokemon";

/**
 * Dados vindos da sincronização (PokéAPI) que sobrescrevem o domínio
 * oficial. Nunca inclui curadoria do Studio.
 */
export type DadosSincronizados = Pick<Pokemon, "oficial">;

/**
 * Aplica dados oficiais sincronizados sobre um Pokémon existente,
 * preservando integralmente a curadoria do Studio.
 *
 * RFC-001 — fluxo de sincronização:
 * PokéAPI → PokemonOficial → Merge → PokemonStudio → Pokemon
 *
 * Permite sincronizações repetidas sem perda dos dados editados
 * manualmente: `oficial` é substituído pela fonte oficial, enquanto
 * `studio` permanece intocado.
 */
export function mergePokemon(
  atual: Pokemon,
  sincronizado: DadosSincronizados,
): Pokemon {
  return {
    ...atual,
    oficial: sincronizado.oficial,
  };
}
