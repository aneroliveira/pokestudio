export type TierPokemon =
  | "S+"
  | "S"
  | "A+"
  | "A"
  | "B"
  | "C";

export type TipoPokemon =
  | "Inseto"
  | "Sombrio"
  | "Dragão"
  | "Elétrico"
  | "Fada"
  | "Lutador"
  | "Fogo"
  | "Voador"
  | "Fantasma"
  | "Planta"
  | "Terra"
  | "Gelo"
  | "Normal"
  | "Veneno"
  | "Psíquico"
  | "Pedra"
  | "Aço"
  | "Água";

export interface UsoPokemon {
  raid: boolean;
  rocket: boolean;
  ginasio: boolean;
  pvp: boolean;
}

export interface HundosPokemon {
  pesquisa?: number;
  raidNivel20?: number;
  raidNivel25?: number;
}

export interface QuaseHundosPokemon {
  iv98?: number;
  iv96?: number;
}

export interface Pokemon {
  id: number;
  numero: string;
  nome: string;
  regiao: string;
  tipos: TipoPokemon[];
  tier: TierPokemon;
  descricao: string;
  imagem: string;

  uso: UsoPokemon;

  hundos: HundosPokemon;

  quaseHundos: QuaseHundosPokemon;

  fraquezas: TipoPokemon[];

  resistencias: TipoPokemon[];

  melhoresMegas: string[];
}