import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { getRegion } from "@/utils/getRegion";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import { obterEvolucaoPokemon } from "./evolutionMapper";
import { obterFormasPokemon } from "./formMapper";

type PokemonApi = {
  id: number;
  name: string;
  stats: Array<{
    base_stat: number;
    stat: { name: string };
  }>;
  types: Array<{ type: { name: string } }>;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string | null;
      };
    };
  };
};

type EspecieApi = Record<string, unknown>;
type CadeiaEvolutivaApi = Record<string, unknown>;
type VariedadeApi = Record<string, unknown>;

export function mapearPokemonBasico(
  pokemon: PokemonApi,
  _especie: EspecieApi,
  cadeiaEvolutiva: CadeiaEvolutivaApi,
  variedades: VariedadeApi[],
) {
  const evolucao = obterEvolucaoPokemon(
    cadeiaEvolutiva,
    pokemon.name,
  );

  const formas = obterFormasPokemon(variedades);

  const tipos: TipoPokemon[] = pokemon.types.map((item) => TIPOS_POKEMON[item.type.name]);

  const nome = {
    ptBR:
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1),
    enUS:
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1),
  };

  const statsBase = {
    attack: pokemon.stats[1].base_stat,
    defense: pokemon.stats[2].base_stat,
    stamina: pokemon.stats[0].base_stat,
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
      statsBase,
      evolucao,
      formas,
      movepool: {
        rapidos: [],
        carregados: [],
      },
    },
  } satisfies Partial<Pokemon>;
}
