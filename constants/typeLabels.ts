import type { ClimaPokemon, TipoPokemon } from "@/models/pokemon";

/**
 * Camada de tradução para exibição. O domínio permanece em inglês
 * canônico (TipoPokemon / ClimaPokemon); estes rótulos são usados
 * apenas na UI.
 */
export const TIPO_LABEL: Record<TipoPokemon, string> = {
  Bug: "Inseto",
  Dark: "Sombrio",
  Dragon: "Dragão",
  Electric: "Elétrico",
  Fairy: "Fada",
  Fighting: "Lutador",
  Fire: "Fogo",
  Flying: "Voador",
  Ghost: "Fantasma",
  Grass: "Planta",
  Ground: "Terra",
  Ice: "Gelo",
  Normal: "Normal",
  Poison: "Venenoso",
  Psychic: "Psíquico",
  Rock: "Pedra",
  Steel: "Aço",
  Water: "Água",
};

export const CLIMA_LABEL: Record<ClimaPokemon, string> = {
  Sunny: "Ensolarado",
  PartlyCloudy: "Parcialmente nublado",
  Cloudy: "Nublado",
  Rainy: "Chuvoso",
  Windy: "Ventando",
  Snow: "Nevando",
  Fog: "Neblina",
};
