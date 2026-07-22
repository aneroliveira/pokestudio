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
  | "Bug"
  | "Dark"
  | "Dragon"
  | "Electric"
  | "Fairy"
  | "Fighting"
  | "Fire"
  | "Flying"
  | "Ghost"
  | "Grass"
  | "Ground"
  | "Ice"
  | "Normal"
  | "Poison"
  | "Psychic"
  | "Rock"
  | "Steel"
  | "Water";

export type FuncaoPokemon =
  | "Atacante"
  | "Defensor"
  | "Versátil";

export type ClimaPokemon =
  | "Sunny"
  | "PartlyCloudy"
  | "Cloudy"
  | "Rainy"
  | "Windy"
  | "Snow"
  | "Fog";

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

export interface NomeTraduzido {
  ptBR: string;
  enUS: string;
}

export type MovimentoGOId = string;

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

export interface EvolucaoReferencia {
  nome: string;
}

export interface EvolucaoPokemon {
  anteriores: EvolucaoReferencia[];
  proximas: EvolucaoReferencia[];
}

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

// =========================
// Modelo principal
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

export interface Pokemon {
 
  // Identificação
  numero: string;
  nome: NomeTraduzido;
  regiao: string;
  imagem: string;

  // Classificação
  tier: TierPokemon;
  funcao: FuncaoPokemon;
  melhorPara: MelhorParaPokemon[];
  climasFavoraveis: ClimaPokemon[];

  // Combate
  tipos: TipoPokemon[];
  fraquezas: TipoPokemon[];
  resistencias: TipoPokemon[];

  // Investimento
  estadoGO: EstadoGOPokemon;
  shadow: ShadowPokemon;
  buddy: BuddyPokemon;
  evolucao: EvolucaoPokemon;
  formas: FormaPokemon[];
  movepool: MovepoolPokemon;

  // Estatísticas
  hundos: HundosPokemon;
  quaseHundos: QuaseHundosPokemon;

  // Conhecimento
  decisoes: DecisaoPokemon[];
  observacoes: string[];

  // Sinergias
  sinergias: string[];
}