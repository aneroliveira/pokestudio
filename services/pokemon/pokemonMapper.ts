import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { getRegion } from "@/utils/getRegion";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import { obterEvolucaoPokemon } from "./evolutionMapper";
import { obterFormasPokemon } from "./formMapper";

export function mapearPokemonBasico(
  pokemon: any,
  _especie: any,
  cadeiaEvolutiva: any,
  variedades: any[],
) {
  const evolucao = obterEvolucaoPokemon(
    cadeiaEvolutiva,
    pokemon.name,
  );

  const formas = obterFormasPokemon(variedades);

  const tipos: TipoPokemon[] = pokemon.types.map(
    (item: any) => TIPOS_POKEMON[item.type.name],
  );

  const nome = {
    ptBR:
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1),
    enUS:
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1),
  };

  return {
    oficial: {
      numero: `#${String(pokemon.id).padStart(3, "0")}`,
      nome,
      regiao: getRegion(pokemon.id),
      imagem:
        pokemon.sprites.other["official-artwork"]
          .front_default,
      tipos,
      evolucao,
      formas,
      movepool: {
        rapidos: [],
        carregados: [],
      },
    },
  } satisfies Partial<Pokemon>;
}
