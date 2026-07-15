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

export type StatusDecisao = "sim" | "atencao" | "nao";

export interface DecisaoPokemon {
  titulo: string;
  status: StatusDecisao;
}

export type FuncaoPokemon =
  | "Atacante"
  | "Defensor"
  | "Versátil";

export type ClimaPokemon =
  | "Ensolarado"
  | "Parcialmente nublado"
  | "Nublado"
  | "Chuvoso"
  | "Ventando"
  | "Neve"
  | "Neblina";

export interface EvolucaoPokemon {
  possui: boolean;
  doces?: number;
  buddyKm?: number;
  requisito?: string;
}

export interface MegaPokemon {
  possui: boolean;
  nome?: string;
}

export interface ShadowPokemon {
  possuiShadow: boolean;
  recomendadoPurificar: boolean;
}

export interface BuddyPokemon {
  necessario: boolean;
  km?: number;
  objetivo?: string;
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

  decisoes: DecisaoPokemon[];

  observacoes: string[];

  funcao: FuncaoPokemon;

  climaFavoravel: ClimaPokemon;

  evolucao: EvolucaoPokemon;

  mega: MegaPokemon;

  shadow: ShadowPokemon;

  buddy: BuddyPokemon;
}
