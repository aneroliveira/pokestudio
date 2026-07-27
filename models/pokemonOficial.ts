import { NomeTraduzido, TipoPokemon } from "./shared";
import { MovepoolPokemon } from "./movimento";

// =========================
// Evolução
// =========================

export interface RequisitoEvolucao {
  doces: number | null;
  item: string | null;
  quest: string | null;
}

export interface EvolucaoReferencia {
  nome: string;
  numero: string;
  imagem: string;
  proximas: EvolucaoReferencia[];
  // Custo pra evoluir do estágio anterior até este (GO). Ausente quando
  // não há dado do GO para essa transição (não existe na PokéAPI).
  requisito?: RequisitoEvolucao;
}

export interface EvolucaoPokemon {
  anteriores: EvolucaoReferencia[];
  proximas: EvolucaoReferencia[];
}

// =========================
// Formas
// =========================

export type CategoriaFormaPokemon =
  | "Normal"
  | "Regional"
  | "Mega"
  | "Gigamax"
  | "Primal"
  | "Alternativa";

export interface FormaPokemon {
  id: string;
  nome: string;
  categoria: CategoriaFormaPokemon;
  // Sprite pixelado da variedade (PokéAPI). Pode ser "" quando a variedade
  // não tem sprite publicado no repositório.
  sprite: string;
}

// =========================
// Domínio oficial (PokéAPI)
// =========================

export interface PokemonOficial {
  // Identificação
  numero: string;
  nome: NomeTraduzido;
  regiao: string;
  imagem: string;
  imagemShiny: string;

  // Combate
  tipos: TipoPokemon[];

  // Evolução
  evolucao: EvolucaoPokemon;
  formas: FormaPokemon[];

  // Movimentos
  movepool: MovepoolPokemon;
}
