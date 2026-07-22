export async function buscarEspeciePokemon(
  url: string,
) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar espécie do Pokémon."
    );
  }

  return response.json();
}