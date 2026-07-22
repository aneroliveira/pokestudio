export async function buscarCadeiaEvolutiva(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      "Erro ao buscar cadeia evolutiva.",
    );
  }

  return response.json();
}