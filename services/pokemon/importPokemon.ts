import { buscarPokemonNaApi } from "./pokeApi";
import { buscarEspeciePokemon } from "./pokeApiSpecies";
import { mapearPokemonBasico } from "./pokemonMapper";

export async function importarPokemon(nome: string) {
  const pokemon = await buscarPokemonNaApi(nome);

  const especie = await buscarEspeciePokemon(
    pokemon.species.url
  );

  return mapearPokemonBasico(
    pokemon,
    especie
  );
}