import type { Pokemon } from "@/models/pokemon";

import { listarPokemons } from ".";

export function buscarPokemon(texto: string): Pokemon[] {
  const pesquisa = texto.trim().toLowerCase();

  if (!pesquisa) {
    return [];
  }

  return listarPokemons().filter((pokemon) => {
    return (
      pokemon.nome.toLowerCase().includes(pesquisa) ||
      pokemon.numero.replace("#", "").includes(pesquisa)
    );
  });
}