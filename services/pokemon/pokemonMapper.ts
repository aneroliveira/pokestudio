import type {
  Pokemon,
  TipoPokemon,
  ClimaPokemon,
} from "@/models/pokemon";
import { getRegion } from "@/utils/getRegion";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import { CLIMA_POR_TIPO } from "@/constants/typeWeather";

export function mapearPokemonBasico(
  pokemon: any,
  _especie: any,
) {
  const tipos: TipoPokemon[] = pokemon.types.map(
  (item: any) => TIPOS_POKEMON[item.type.name],
);

const climasFavoraveis = Array.from(
  new Set(
    tipos.flatMap((tipo) => {
      const clima = CLIMA_POR_TIPO[tipo];
      return clima ? [clima] : [];
    }),
  ),
);

  return {
    numero: `#${String(pokemon.id).padStart(3, "0")}`,

    nome:
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1),

    regiao: getRegion(pokemon.id),

    imagem:
      pokemon.sprites.other["official-artwork"]
        .front_default,

    tipos,

    climasFavoraveis,
  } satisfies Partial<Pokemon>;
}