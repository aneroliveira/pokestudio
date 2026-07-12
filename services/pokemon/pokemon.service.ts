import pokemon from "@/data/pokemon.json";
import type { Pokemon } from "@/models/pokemon";

export function listarPokemons(): Pokemon[] {
  return pokemon as Pokemon[];
}