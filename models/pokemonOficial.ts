import { NomeTraduzido, TipoPokemon } from "./shared";
import { MovepoolPokemon } from "./movimento";

// =========================
// Evolução
// =========================

export interface EvolucaoReferencia {
  nome: string;
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
  categoria: CategoriaFormaPokemon;
}

// =========================
// Domínio oficial (PokéAPI)
// =========================

export interface PokemonOficial {
  // Identificação
  numero: string;
  nome: NomeTraduzido;
  regiao: string;
  imagem: string | null;

  // Combate
  tipos: TipoPokemon[];
  statsBase?: {
    attack: number;
    defense: number;
    stamina: number;
  };

  // Evolução
  evolucao: EvolucaoPokemon;
  formas: FormaPokemon[];

  // Movimentos
  movepool: MovepoolPokemon;
}
