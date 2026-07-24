import { PokemonGO } from "./pokemonGO";

// =========================
// Domínio Studio (curadoria)
// =========================

export type TierPokemon =
  | "S+"
  | "S"
  | "A+"
  | "A"
  | "B"
  | "C";

export type FuncaoPokemon =
  | "Atacante"
  | "Defensor"
  | "Versátil";

export type MelhorParaPokemon =
  | "Raids"
  | "PvP"
  | "Ginásios"
  | "Rocket";

export type StatusDecisao =
  | "sim"
  | "atencao"
  | "nao";

export interface DecisaoPokemon {
  titulo: string;
  status: StatusDecisao;
  motivo?: string;
}

export interface EstrategiaStudio {
  tier: TierPokemon;
  funcao: FuncaoPokemon;
  melhorPara: MelhorParaPokemon[];
}

export interface ConhecimentoStudio {
  decisoes: DecisaoPokemon[];
  observacoes: string[];
  sinergias: string[];
}

export interface PokemonStudio {
  estrategia: EstrategiaStudio;
  conhecimento: ConhecimentoStudio;
  go: PokemonGO;
}
