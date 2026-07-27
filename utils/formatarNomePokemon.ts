// Formata o slug da PokéAPI (ex.: "flutter-mane") no nome de exibição usado
// pelo Pokémon GO. O GO em pt-BR mantém os nomes internacionais, então o
// "nome pt-BR" é o nome canônico formatado — não há tradução para palavras
// em português. A fonte autoritativa é `especie.names` da PokéAPI (ver
// pokemonMapper); esta função cobre a busca (que só tem o slug do índice) e
// serve de fallback quando não há nome canônico disponível.

// Casos em que o title-case simples ("-" → espaço) erraria o nome oficial.
const CASOS_ESPECIAIS: Record<string, string> = {
  "ho-oh": "Ho-Oh",
  "porygon-z": "Porygon-Z",
  porygon2: "Porygon2",
  "mr-mime": "Mr. Mime",
  "mr-rime": "Mr. Rime",
  "mime-jr": "Mime Jr.",
  "type-null": "Type: Null",
  farfetchd: "Farfetch'd",
  sirfetchd: "Sirfetch'd",
  "nidoran-f": "Nidoran♀",
  "nidoran-m": "Nidoran♂",
  flabebe: "Flabébé",
  "jangmo-o": "Jangmo-o",
  "hakamo-o": "Hakamo-o",
  "kommo-o": "Kommo-o",
  "wo-chien": "Wo-Chien",
  "chi-yu": "Chi-Yu",
  "chien-pao": "Chien-Pao",
  "ting-lu": "Ting-Lu",
};

export function formatarNomePokemon(slug: string): string {
  if (!slug) return "";

  const normalizado = slug.toLowerCase();

  if (CASOS_ESPECIAIS[normalizado]) {
    return CASOS_ESPECIAIS[normalizado];
  }

  return normalizado
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}
