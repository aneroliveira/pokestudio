// =========================
// Domínio Pokémon GO
// =========================

export type TipoEstadoGOPokemon =
  | "Nenhum"
  | "Shadow"
  | "Purificado";

export interface EstadoGOPokemon {
  tipo: TipoEstadoGOPokemon;
  valeInvestir: boolean;
  motivo: string;
}

export interface ShadowPokemon {
  possuiShadow: boolean;
  recomendadoPurificar: boolean;
}

export interface BuddyPokemon {
  necessario: boolean;
  objetivo?: string;
}

export interface HundosPokemon {
  semClima: number;
  comClima: number;
}

export interface QuaseHundosPokemon {
  iv98?: number;
  iv96?: number;
}

export interface PokemonGO {
  estado: EstadoGOPokemon;
  shadow: ShadowPokemon;
  buddy: BuddyPokemon;

  hundos: HundosPokemon;
  quaseHundos: QuaseHundosPokemon;
}
