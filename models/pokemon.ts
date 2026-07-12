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

export interface Pokemon {
  id: number;
  numero: string;
  nome: string;
  geracao: string;
  tipos: TipoPokemon[];
  tier: TierPokemon;
  descricao: string;
  imagem: string;
}