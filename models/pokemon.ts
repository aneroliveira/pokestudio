import { PokemonOficial } from "./pokemonOficial";
import { PokemonStudio } from "./pokemonStudio";

// =========================
// Agregador do domínio Pokemon
// =========================
// pokemon.ts apenas compõe os domínios e reexporta os tipos auxiliares.
// As definições vivem nos seus próprios módulos (shared / movimento /
// pokemonOficial / pokemonGO / pokemonStudio), evitando que este arquivo
// seja o "centro" de todos os models.

export * from "./shared";
export * from "./movimento";
export * from "./pokemonOficial";
export * from "./pokemonGO";
export * from "./pokemonStudio";

export interface Pokemon {
  oficial: PokemonOficial;
  studio: PokemonStudio;
}
