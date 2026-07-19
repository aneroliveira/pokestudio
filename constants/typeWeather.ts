import type { ClimaPokemon, TipoPokemon } from "@/models/pokemon";

export const CLIMA_POR_TIPO: Partial<Record<TipoPokemon, ClimaPokemon>> = {
  Normal: "Partly Cloudy",
  Rock: "Partly Cloudy",

  Fire: "Sunny",
  Grass: "Sunny",
  Ground: "Sunny",

  Water: "Rainy",
  Electric: "Rainy",
  Bug: "Rainy",

  Ice: "Snow",

  Dragon: "Windy",
  Psychic: "Windy",
  Flying: "Windy",

  Ghost: "Fog",
  Dark: "Fog",

  Fighting: "Cloudy",
  Fairy: "Cloudy",
  Poison: "Cloudy",

  Steel: "Snow",
};