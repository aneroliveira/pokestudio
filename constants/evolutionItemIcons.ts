// Nem todo item de evolução do GO existe como item na PokéAPI. Revalidado
// contra o catálogo completo (/api/v2/item?limit=2000):
// - Sinnoh Stone e Unova Stone: não existem no jogo principal (são um
//   atalho do GO pra representar várias pedras/condições de uma vez).
// - Gimmighoul Coins: existe (gimmighoul-coin), mas sem sprite (null).
// - Zygarde Cell: existe algo parecido (zygarde-cube), mas é um item
//   diferente do jogo principal — usar o ícone dele seria enganoso.
// Esses quatro caem no ícone genérico (ICONE_GENERICO_ITEM) em vez do
// sprite real do jogo.
export const ICONE_ITEM_EVOLUCAO: Record<string, string> = {
  "Dragon Scale": "dragon-scale",
  "King's Rock": "kings-rock",
  "Metal Coat": "metal-coat",
  "Sun Stone": "sun-stone",
  "Sweet Apple": "sweet-apple",
  "Syrupy Apple": "syrupy-apple",
  "Tart Apple": "tart-apple",
  Upgrade: "up-grade",
};

export function urlIconeItemEvolucao(nomeItem: string): string | null {
  const slug = ICONE_ITEM_EVOLUCAO[nomeItem];

  return slug
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${slug}.png`
    : null;
}

export type IconeGenerico = "gem" | "coins" | "dna";

// Ícone de contorno (lucide) pros itens sem sprite real — estilo
// propositalmente diferente do pixel art do jogo, pra não parecer que é
// o ícone oficial.
export const ICONE_GENERICO_ITEM: Record<string, IconeGenerico> = {
  "Sinnoh Stone": "gem",
  "Unova Stone": "gem",
  "Gimmighoul Coins": "coins",
  "Zygarde Cell": "dna",
};

// PokéAPI não traduz nomes de item pro português (só ja/ko/zh/fr/de/es/
// it). Lista pequena e fixa, então traduzida à mão em vez de inventar
// uma integração de i18n só pra isso.
export const NOME_ITEM_PT_BR: Record<string, string> = {
  "Dragon Scale": "Escama de Dragão",
  "Gimmighoul Coins": "Moedas de Gimmighoul",
  "King's Rock": "Pedra do Rei",
  "Metal Coat": "Revestimento de Metal",
  "Sinnoh Stone": "Pedra de Sinnoh",
  "Sun Stone": "Pedra do Sol",
  "Sweet Apple": "Maçã Doce",
  "Syrupy Apple": "Maçã em Calda",
  "Tart Apple": "Maçã Azeda",
  "Unova Stone": "Pedra de Unova",
  Upgrade: "Aprimoramento",
  "Zygarde Cell": "Célula de Zygarde",
};

export function traduzirItemEvolucao(nomeItem: string): string {
  return NOME_ITEM_PT_BR[nomeItem] ?? nomeItem;
}

// PokéAPI não tem um item genérico de "doce" (é um conceito só do GO); a
// Rare Candy é o sprite mais próximo pra representar o ícone de doce.
export const ICONE_DOCE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png";
