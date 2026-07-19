import { TIPOS_POKEMON } from "@/constants/pokemonTypes";
import type { TipoPokemon } from "@/models/pokemon";

export function calcularMultiplicadores(
  tiposApi: any[],
): Map<TipoPokemon, number> {
  const multiplicadores = new Map<TipoPokemon, number>();

  for (const tipo of tiposApi) {
    const relations = tipo.damage_relations;

    const aplicar = (
      lista: any[],
      fator: number,
    ) => {
      for (const item of lista) {
        const tipoTraduzido =
          TIPOS_POKEMON[item.name];

        if (!tipoTraduzido) continue;

        const atual =
          multiplicadores.get(tipoTraduzido) ?? 1;

        multiplicadores.set(
          tipoTraduzido,
          atual * fator,
        );
      }
    };

    aplicar(
      relations.double_damage_from,
      2,
    );

    aplicar(
      relations.half_damage_from,
      0.5,
    );

    aplicar(
      relations.no_damage_from,
      0,
    );
  }

  return multiplicadores;
}