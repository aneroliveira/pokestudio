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

  // Golpes legados (Elite TM): não se obtêm por TM comum. São o critério do
  // chip "Vale Elite TM" na curadoria, por isso ficam separados dos demais.
  rapidosLegado?: MovimentoGOId[];
  carregadosLegado?: MovimentoGOId[];
}
