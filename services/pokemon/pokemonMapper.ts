import type {
  Pokemon,
  TipoPokemon,
} from "@/models/pokemon";
import { getRegion } from "@/utils/getRegion";

const TIPOS: Record<string, TipoPokemon> = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  grass: "Planta",
  electric: "Elétrico",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Veneno",
  ground: "Terra",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada",
};

export function mapearPokemonBasico(data: any) {
  return {
    numero: `#${String(data.id).padStart(3, "0")}`,

    nome:
      data.name.charAt(0).toUpperCase() +
      data.name.slice(1),

    regiao: getRegion(data.id),

    imagem:
      data.sprites.other["official-artwork"]
        .front_default,

    tipos: data.types.map(
      (item: any) => TIPOS[item.type.name]
    ),
  } satisfies Partial<Pokemon>;
}