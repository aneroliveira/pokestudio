import type { Pokemon, PokemonStudio } from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import type { StudioMap } from "@/services/pokemon/studioStore";
import { importarPokemon } from "@/services/pokemon/importPokemon";
import { mergePokemon } from "@/services/pokemon/mergePokemon";
import { createEmptyPokemon } from "@/utils/createEmptyPokemon";

/**
 * Junta o oficial (PokéAPI, sob demanda) com a curadoria local. Usada tanto
 * pela Home quanto pelo /pocket — qualquer tela que resolva um item de busca
 * num Pokémon completo passa por aqui.
 */
export async function montarPokemon(
  item: ItemIndicePokemon,
  studio: PokemonStudio,
): Promise<Pokemon> {
  const importado = await importarPokemon(item.nomeEn);

  const base: Pokemon = {
    oficial: createEmptyPokemon().oficial,
    studio,
  };

  return mergePokemon(base, importado);
}

export function studioDoMapa(mapa: StudioMap, numero: string): PokemonStudio {
  return mapa[numero] ?? createEmptyPokemon().studio;
}
