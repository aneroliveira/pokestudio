import formasCombateData from "@/data/formasCombate.json";
import type { TipoPokemon } from "@/models/pokemon";

/**
 * Formas do GO que mudam o tipo do Pokémon (data/formasCombate.json, gerado
 * por scripts/gerarFormasCombate.ts). Usadas pelo seletor "Forma" do
 * Combate — formas que só mudam stats não entram, o Combate sairia igual.
 */
export interface FormaCombate {
  id: string;
  nome: string;
  tipos: TipoPokemon[];
  /** Ícone da forma no GO; ausente quando a forma não tem arte publicada. */
  imagem?: string;
}

interface EspecieFormasCombate {
  numeroBase: string;
  formas: FormaCombate[];
}

const ESPECIES = formasCombateData as EspecieFormasCombate[];

function mesmosTipos(a: TipoPokemon[], b: TipoPokemon[]): boolean {
  return a.length === b.length && a.every((tipo) => b.includes(tipo));
}

/**
 * Formas de combate do Pokémon, com a que bate com os tipos da ficha
 * (forma padrão da PokéAPI — ex.: Zacian Herói) na frente, pra ser a que
 * abre selecionada. Lista vazia quando o Pokémon não tem formas assim.
 */
export function obterFormasCombate(
  numero: string,
  tiposOficiais: TipoPokemon[],
): FormaCombate[] {
  // Comparação numérica: "#888" no roster × "#0888"/"#888" na ficha.
  const dex = Number(numero.replace("#", ""));
  const especie = ESPECIES.find(
    (item) => Number(item.numeroBase.replace("#", "")) === dex,
  );
  if (!especie) return [];

  const padrao = especie.formas.find((forma) =>
    mesmosTipos(forma.tipos, tiposOficiais),
  );
  if (!padrao) return especie.formas;

  return [padrao, ...especie.formas.filter((forma) => forma !== padrao)];
}
