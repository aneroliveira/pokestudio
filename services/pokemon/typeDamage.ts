import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import type { TipoPokemon } from "@/models/pokemon";

export function obterFraquezasTipo(tipoApi: any): TipoPokemon[] {
  return tipoApi.damage_relations.double_damage_from
    .map((item: any) => TIPOS_POKEMON[item.name])
    .filter(Boolean);
}