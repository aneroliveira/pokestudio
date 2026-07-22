// Item do índice de busca. Gerado a partir da lista da PokéAPI
// (scripts/gerarIndice.ts). Contém o mínimo para busca rápida; os dados
// oficiais completos são buscados sob demanda ao abrir o Pokémon.
export interface ItemIndicePokemon {
  id: number;
  numero: string;
  nomeEn: string;
}
