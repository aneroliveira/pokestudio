// =========================
// Tipos básicos
// =========================

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

export type MelhorParaPokemon =
  | "Raids"
  | "PvP"
  | "Ginásios"
  | "Rocket";

export type StatusDecisao =
  | "sim"
  | "atencao"
  | "nao";

// =========================
// Estruturas
// =========================

export interface HundosPokemon {
  semClima: number;
  comClima: number;
}

export interface QuaseHundosPokemon {
  iv98?: number;
  iv96?: number;
}

export interface DecisaoPokemon {
  titulo: string;
  status: StatusDecisao;
}

export interface EvolucaoPokemon {
  possuiEvolucao: boolean;
  possui: boolean;
  doces?: number;
  requisito?: string;
}

export interface FormaEspecialPokemon {
  tipo: "Nenhuma" | "Mega" | "Primal";
  nome: string;
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

// =========================
// Modelo principal
// =========================

export interface Pokemon {
  // Identificação
  numero: string;
  nome: string;
  regiao: string;
  imagem: string;

  // Classificação
  tier: TierPokemon;
  funcao: FuncaoPokemon;
  melhorPara: MelhorParaPokemon[];
  climaFavoravel: ClimaPokemon;

  // Combate
  tipos: TipoPokemon[];
  fraquezas: TipoPokemon[];
  resistencias: TipoPokemon[];

  // Investimento
  formaEspecial: FormaEspecialPokemon;
  shadow: ShadowPokemon;
  buddy: BuddyPokemon;
  evolucao: EvolucaoPokemon;

  // Estatísticas
  hundos: HundosPokemon;
  quaseHundos: QuaseHundosPokemon;

  // Conhecimento
  decisoes: DecisaoPokemon[];
  observacoes: string[];

  // Sinergias
  sinergias: string[];
}