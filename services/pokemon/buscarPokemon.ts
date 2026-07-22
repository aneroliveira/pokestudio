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
