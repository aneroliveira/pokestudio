import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { getRegion } from "@/utils/getRegion";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import { obterEvolucaoPokemon } from "./evolutionMapper";
import { obterFormasPokemon } from "./formMapper";

export function mapearPokemonBasico(
  pokemon: any,
  especie: any,
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

  // A variedade padrão de algumas espécies (Giratina, Landorus, Shaymin...)
  // tem sufixo próprio na PokéAPI (ex.: "giratina-altered") mesmo sendo a
  // forma-base; nesse caso preferimos o nome limpo da espécie. Formas
  // alternativas buscadas explicitamente (ex.: "giratina-origin") mantêm
  // o nome da variedade, que é o que as distingue.
  const nomeBase = pokemon.is_default
    ? especie.name
    : pokemon.name;

  const nome = {
    ptBR:
      nomeBase.charAt(0).toUpperCase() +
      nomeBase.slice(1),
    enUS:
      nomeBase.charAt(0).toUpperCase() +
      nomeBase.slice(1),
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
