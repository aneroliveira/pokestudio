import { buscarPokemonNaApi } from "./pokeApi";
import { buscarEspeciePokemon } from "./pokeApiSpecies";
import { buscarTipoPokemon } from "./pokeApiType";
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

  const tipos = await Promise.all(
    pokemon.types.map((item: any) =>
      buscarTipoPokemon(item.type.url),
    ),
  );

  return mapearPokemonBasico(
  pokemon,
  especie,
  tipos,
  cadeiaEvolutiva,
  especie.varieties,
);
}