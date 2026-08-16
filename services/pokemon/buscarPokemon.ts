import indice from "@/data/pokemonIndex.json";
import type { ItemIndicePokemon } from "@/models/indice";

const INDICE = indice as ItemIndicePokemon[];

/**
 * Busca no índice local (todos os Pokémon) por nome (inglês) ou número.
 * Retorna itens leves do índice; os dados oficiais completos são buscados
 * sob demanda ao selecionar (ver app/page.tsx).
 */
export function buscarPokemon(texto: string): ItemIndicePokemon[] {
  const pesquisa = texto.trim().toLowerCase();

  if (!pesquisa) {
    return [];
  }

  return INDICE.filter(
    (item) =>
      item.nomeEn.toLowerCase().startsWith(pesquisa) ||
      item.numero.replace("#", "").startsWith(pesquisa),
  ).slice(0, 20);
}

/**
 * Busca exata pelo slug da PokéAPI. Diferente de `buscarPokemon`, que é
 * por prefixo: aqui o slug já veio de um link interno (ex.: `/?p=gengar`,
 * usado pelo Plano), então tem que resolver num item só ou em nenhum.
 */
export function buscarPorNomeEn(
  nomeEn: string,
): ItemIndicePokemon | undefined {
  const slug = nomeEn.trim().toLowerCase();

  return INDICE.find((item) => item.nomeEn.toLowerCase() === slug);
}
