import type { TipoPokemon } from "@/models/pokemon";

/**
 * Relações defensivas de cada tipo (chart padrão a partir da Gen 6).
 *
 * Para um tipo defensor:
 * - `double_damage_from`: recebe dano dobrado (fraqueza);
 * - `half_damage_from`: recebe metade do dano (resistência);
 * - `no_damage_from`: imune.
 *
 * As relações (não os multiplicadores exatos do GO) são idênticas às da
 * série principal e suficientes para derivar fraquezas/resistências, que é
 * o que a aplicação exibe.
 */
export type RelacoesDefensivas = {
  double_damage_from: TipoPokemon[];
  half_damage_from: TipoPokemon[];
  no_damage_from: TipoPokemon[];
};

export const RELACOES_DEFENSIVAS: Record<TipoPokemon, RelacoesDefensivas> = {
  Normal: {
    double_damage_from: ["Fighting"],
    half_damage_from: [],
    no_damage_from: ["Ghost"],
  },
  Fire: {
    double_damage_from: ["Water", "Ground", "Rock"],
    half_damage_from: ["Fire", "Grass", "Ice", "Bug", "Steel", "Fairy"],
    no_damage_from: [],
  },
  Water: {
    double_damage_from: ["Electric", "Grass"],
    half_damage_from: ["Fire", "Water", "Ice", "Steel"],
    no_damage_from: [],
  },
  Grass: {
    double_damage_from: ["Fire", "Ice", "Poison", "Flying", "Bug"],
    half_damage_from: ["Water", "Grass", "Electric", "Ground"],
    no_damage_from: [],
  },
  Electric: {
    double_damage_from: ["Ground"],
    half_damage_from: ["Electric", "Flying", "Steel"],
    no_damage_from: [],
  },
  Ice: {
    double_damage_from: ["Fire", "Fighting", "Rock", "Steel"],
    half_damage_from: ["Ice"],
    no_damage_from: [],
  },
  Fighting: {
    double_damage_from: ["Flying", "Psychic", "Fairy"],
    half_damage_from: ["Rock", "Bug", "Dark"],
    no_damage_from: [],
  },
  Poison: {
    double_damage_from: ["Ground", "Psychic"],
    half_damage_from: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
    no_damage_from: [],
  },
  Ground: {
    double_damage_from: ["Water", "Grass", "Ice"],
    half_damage_from: ["Poison", "Rock"],
    no_damage_from: ["Electric"],
  },
  Flying: {
    double_damage_from: ["Electric", "Ice", "Rock"],
    half_damage_from: ["Grass", "Fighting", "Bug"],
    no_damage_from: ["Ground"],
  },
  Psychic: {
    double_damage_from: ["Bug", "Ghost", "Dark"],
    half_damage_from: ["Fighting", "Psychic"],
    no_damage_from: [],
  },
  Bug: {
    double_damage_from: ["Fire", "Flying", "Rock"],
    half_damage_from: ["Grass", "Fighting", "Ground"],
    no_damage_from: [],
  },
  Rock: {
    double_damage_from: ["Water", "Grass", "Fighting", "Ground", "Steel"],
    half_damage_from: ["Normal", "Fire", "Poison", "Flying"],
    no_damage_from: [],
  },
  Ghost: {
    double_damage_from: ["Ghost", "Dark"],
    half_damage_from: ["Poison", "Bug"],
    no_damage_from: ["Normal", "Fighting"],
  },
  Dragon: {
    double_damage_from: ["Ice", "Dragon", "Fairy"],
    half_damage_from: ["Fire", "Water", "Grass", "Electric"],
    no_damage_from: [],
  },
  Dark: {
    double_damage_from: ["Fighting", "Bug", "Fairy"],
    half_damage_from: ["Ghost", "Dark"],
    no_damage_from: ["Psychic"],
  },
  Steel: {
    double_damage_from: ["Fire", "Fighting", "Ground"],
    half_damage_from: [
      "Normal",
      "Grass",
      "Ice",
      "Flying",
      "Psychic",
      "Bug",
      "Rock",
      "Dragon",
      "Steel",
      "Fairy",
    ],
    no_damage_from: ["Poison"],
  },
  Fairy: {
    double_damage_from: ["Poison", "Steel"],
    half_damage_from: ["Fighting", "Bug", "Dark"],
    no_damage_from: ["Dragon"],
  },
};
