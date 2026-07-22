import type { PokemonStudio } from "@/models/pokemon";

export type StudioMap = Record<string, PokemonStudio>;

/** Carrega o mapa completo de curadoria (studio) persistido no backend. */
export async function carregarStudioMap(): Promise<StudioMap> {
  const response = await fetch("/api/studio");

  if (!response.ok) {
    throw new Error("Erro ao carregar a curadoria.");
  }

  return response.json();
}

/** Grava (upsert) a curadoria de um Pokémon, indexada por numero. */
export async function salvarStudio(
  numero: string,
  studio: PokemonStudio,
): Promise<void> {
  const response = await fetch("/api/studio", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numero, studio }),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar a curadoria.");
  }
}
