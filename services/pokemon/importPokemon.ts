import { buscarPokemonNaApi } from "./pokeApi";
import { buscarEspeciePokemon } from "./pokeApiSpecies";
import { mapearPokemonBasico } from "./pokemonMapper";
import { buscarCadeiaEvolutiva } from "./pokeApiEvolution";

export async function importarPokemon(nome: string) {
  const pokemon = await buscarPokemonNaApi(nome);

  const especie = await buscarEspeciePokemon(
    pokemon.species.url,
  );

  const cadeiaEvolutiva =
    await buscarCadeiaEvolutiva(
      especie.evolution_chain.url,
    );

  return mapearPokemonBasico(
    pokemon,
    especie,
    cadeiaEvolutiva,
    especie.varieties,
  );
}
