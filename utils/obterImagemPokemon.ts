export function obterImagemPokemon(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/**
 * Sprite pequeno (o do jogo antigo, ~96px), para listas densas onde a arte
 * oficial pesaria demais — ex.: as tabelas do Plano.
 */
export function obterSpritePokemon(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

/** Versão brilhante do sprite pequeno — usada na Pokédex em modo Shiny. */
export function obterSpriteShinyPokemon(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`;
}

/** "#094" → 94. O índice guarda o número já formatado com zeros à esquerda. */
export function idDoNumero(numero: string): number {
  return Number(numero.replace("#", ""));
}