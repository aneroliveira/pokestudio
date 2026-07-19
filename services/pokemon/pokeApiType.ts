export async function buscarTipoPokemon(
  url: string,
) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar informações do tipo."
    );
  }

  return response.json();
}