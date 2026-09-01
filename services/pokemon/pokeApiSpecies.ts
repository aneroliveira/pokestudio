import type { EspecieApi } from "@/models/pokeApi";

export async function buscarEspeciePokemon(
  url: string,
): Promise<EspecieApi> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar espécie do Pokémon."
    );
  }

  return response.json();
}