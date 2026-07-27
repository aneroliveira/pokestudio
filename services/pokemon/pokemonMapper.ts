import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { getRegion } from "@/utils/getRegion";
import { formatarNomePokemon } from "@/utils/formatarNomePokemon";
import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import { obterEvolucaoPokemon } from "./evolutionMapper";
import { obterFormasPokemon } from "./formMapper";

// Nome canônico da espécie a partir de `especie.names` da PokéAPI. O GO em
// pt-BR usa os nomes internacionais, então preferimos pt/pt-BR (raro) e caímos
// para en ("Flutter Mane", "Ho-Oh", "Mr. Mime", "Farfetch'd"), que já vem
// corretamente formatado e sem sufixo de forma.
function obterNomeCanonicoEspecie(especie: any): string | null {
  const names: any[] = especie?.names ?? [];
  const porIdioma = (idioma: string) =>
    names.find((n) => n?.language?.name === idioma)?.name;

  return (
    porIdioma("pt-BR") ||
    porIdioma("pt") ||
    porIdioma("en") ||
    null
  );
}

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
  // forma-base; nesse caso preferimos o nome canônico da espécie
  // (`especie.names`). Formas alternativas buscadas explicitamente
  // (ex.: "giratina-origin") mantêm o nome formatado da variedade, que é o
  // que as distingue.
  const nomeExibido = pokemon.is_default
    ? obterNomeCanonicoEspecie(especie) ??
      formatarNomePokemon(especie.name)
    : formatarNomePokemon(pokemon.name);

  const nome = {
    ptBR: nomeExibido,
    enUS: nomeExibido,
  };

  return {
    oficial: {
      numero: `#${String(pokemon.id).padStart(3, "0")}`,
      nome,
      regiao: getRegion(pokemon.id),
      imagem:
        pokemon.sprites.other["official-artwork"]
          .front_default,
      imagemShiny:
        pokemon.sprites.other["official-artwork"]
          .front_shiny,
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
