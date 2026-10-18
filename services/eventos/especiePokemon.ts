import indiceData from "@/data/pokemonIndex.json";
import type { ItemIndicePokemon } from "@/models/indice";

const INDICE = indiceData as ItemIndicePokemon[];
const ID_POR_NOME = new Map(INDICE.map((item) => [item.nomeEn, item.id]));
// O índice guarda algumas espécies com a forma padrão no nome
// ("minior-red-meteor", "giratina-altered") — a espécie sozinha também
// precisa achar.
for (const item of INDICE) {
  const especie = item.nomeEn.split("-")[0];
  if (!ID_POR_NOME.has(especie)) ID_POR_NOME.set(especie, item.id);
}

/** Sufixo de forma regional nos ícones do pokemon-go-api/assets
 *  (pm77.fGALARIAN.icon.png). */
const FORMAS_REGIONAIS: [RegExp, string][] = [
  [/\bde galar\b/, "GALARIAN"],
  [/\bde alola\b/, "ALOLA"],
  [/\bde hisui\b/, "HISUIAN"],
  [/\bde paldea\b/, "PALDEA"],
];

export interface EspeciePokemon {
  id: number;
  /** Forma regional, quando o nome curado diz ("Ponyta de Galar"). */
  forma?: string;
}

/** "Zubat de cartola" → zubat, "Mega Chandelure" → chandelure,
 *  "Regidrago Dinamax (12/11)" → regidrago, "Ponyta de Galar" → ponyta
 *  (forma GALARIAN). Nomes de evento são curados em PT-BR com o nome da
 *  espécie na frente, então a primeira palavra (fora o "Mega") basta pra
 *  achar no índice. Fantasias caem no Pokémon base. */
export function especiePorNome(nome: string): EspeciePokemon | undefined {
  const minusculo = nome.toLowerCase();
  const palavras = minusculo.split(/[\s(]+/).filter(Boolean);
  const especie = palavras[0] === "mega" ? palavras[1] : palavras[0];
  const id = especie ? ID_POR_NOME.get(especie) : undefined;
  if (!id) return undefined;

  const forma = FORMAS_REGIONAIS.find(([padrao]) => padrao.test(minusculo))?.[1];
  return { id, forma };
}
