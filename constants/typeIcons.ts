import type { TipoPokemon } from "@/models/pokemon";

/**
 * Ícones de tipo extraídos do APK do Pokémon GO (badges reais do jogo),
 * via o mirror da comunidade ZeChrales/PogoAssets. Mesmo host
 * (raw.githubusercontent.com) já liberado em next.config para os sprites
 * oficiais e as Megas.
 */
const BASE_URL =
  "https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/static_assets/png";

// O jogo nomeia o arquivo de Lutador como "Fight", não "Fighting".
const SUFIXO_ARQUIVO: Record<TipoPokemon, string> = {
  Bug: "Bug",
  Dark: "Dark",
  Dragon: "Dragon",
  Electric: "Electric",
  Fairy: "Fairy",
  Fighting: "Fight",
  Fire: "Fire",
  Flying: "Flying",
  Ghost: "Ghost",
  Grass: "Grass",
  Ground: "Ground",
  Ice: "Ice",
  Normal: "Normal",
  Poison: "Poison",
  Psychic: "Psychic",
  Rock: "Rock",
  Steel: "Steel",
  Water: "Water",
};

export function obterIconeTipo(tipo: TipoPokemon): string {
  return `${BASE_URL}/Badge_Type_${SUFIXO_ARQUIVO[tipo]}_01.png`;
}
