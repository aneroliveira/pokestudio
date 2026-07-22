import { NomeTraduzido, TipoPokemon } from "./shared";

// =========================
// Movimentos (Pokémon GO)
// =========================

export type MovimentoGOId = string;

export type CategoriaMovimentoGO =
  | "Rapido"
  | "Carregado";

export interface MovimentoGO {
  id: MovimentoGOId;
  nome: NomeTraduzido;
  tipo: TipoPokemon;
  categoria: CategoriaMovimentoGO;
}

export interface MovepoolPokemon {
  rapidos: MovimentoGOId[];
  carregados: MovimentoGOId[];
}
