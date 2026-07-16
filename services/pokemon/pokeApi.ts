export async function buscarPokemonNaApi(nome: string) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`
  );

  if (!response.ok) {
    throw new Error("Pokémon não encontrado.");
  }

  return response.json();
}