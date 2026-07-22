// =========================
// Primitivos compartilhados
// =========================
// Tipos cross-cutting usados por mais de um domínio. Módulo folha:
// não depende de nenhum outro model, evitando dependências invertidas.

export interface NomeTraduzido {
  ptBR: string;
  enUS: string;
}

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

export type ClimaPokemon =
  | "Sunny"
  | "PartlyCloudy"
  | "Cloudy"
  | "Rainy"
  | "Windy"
  | "Snow"
  | "Fog";
