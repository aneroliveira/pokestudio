import type {
  Pokemon,
  TipoPokemon,
  ClimaPokemon,
} from "@/models/pokemon";
import { getRegion } from "@/utils/getRegion";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import { CLIMA_POR_TIPO } from "@/constants/typeWeather";
import { calcularMultiplicadores } from "./typeMultiplier";
import { obterEvolucaoPokemon } from "./evolutionMapper";
import { obterFormasPokemon } from "./formMapper";

export function mapearPokemonBasico(
  pokemon: any,
  _especie: any,
  tiposApi: any[],
  cadeiaEvolutiva: any,
  variedades: any[],
) {
  void tiposApi;
  void variedades;

  const evolucao = obterEvolucaoPokemon(
    cadeiaEvolutiva,
    pokemon.name,
  );

  console.log(
  pokemon.name,
  variedades.map((v: any) => v.pokemon.name),
);

  const formas = obterFormasPokemon(variedades);

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

  const multiplicadores =
    calcularMultiplicadores(tiposApi);

  const fraquezas = Array.from(
    multiplicadores.entries(),
  )
    .filter(([, multiplicador]) => multiplicador > 1)
    .map(([tipo]) => tipo);

  const resistencias = Array.from(
    multiplicadores.entries(),
  )
    .filter(
      ([, multiplicador]) =>
        multiplicador > 0 &&
        multiplicador < 1,
    )
    .map(([tipo]) => tipo);


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
    fraquezas,
    resistencias,

    evolucao,
    formas,
  } satisfies Partial<Pokemon>;
}