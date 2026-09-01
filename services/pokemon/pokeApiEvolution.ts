import type { CadeiaEvolutivaApi } from "@/models/pokeApi";

export async function buscarCadeiaEvolutiva(
  url: string,
): Promise<CadeiaEvolutivaApi> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar cadeia evolutiva.",
    );
  }

  return response.json();
}