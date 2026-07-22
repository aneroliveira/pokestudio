import type { ClimaPokemon, TipoPokemon } from "@/models/pokemon";
import { RELACOES_DEFENSIVAS } from "@/constants/typeChart";
import { CLIMA_POR_TIPO } from "@/constants/typeWeather";

export interface DerivadosCalculados {
  fraquezas: TipoPokemon[];
  resistencias: TipoPokemon[];
  climasFavoraveis: ClimaPokemon[];
}

/**
 * Calcula os dados derivados de um Pokémon a partir dos seus tipos.
 *
 * RFC-001 — dados derivados nunca são persistidos; sempre calculados.
 *
 * Multiplica os fatores defensivos de cada tipo (×2 fraqueza, ×0.5
 * resistência, ×0 imunidade); fraquezas têm multiplicador > 1 e
 * resistências 0 < multiplicador < 1 (imunidades ficam de fora de ambos).
 */
export function calcularDerivados(
  tipos: TipoPokemon[],
): DerivadosCalculados {
  const multiplicadores = new Map<TipoPokemon, number>();

  const aplicar = (lista: TipoPokemon[], fator: number) => {
    for (const tipo of lista) {
      const atual = multiplicadores.get(tipo) ?? 1;
      multiplicadores.set(tipo, atual * fator);
    }
  };

  for (const tipo of tipos) {
    const relacoes = RELACOES_DEFENSIVAS[tipo];
    if (!relacoes) continue;

    aplicar(relacoes.double_damage_from, 2);
    aplicar(relacoes.half_damage_from, 0.5);
    aplicar(relacoes.no_damage_from, 0);
  }

  const fraquezas = Array.from(multiplicadores.entries())
    .filter(([, multiplicador]) => multiplicador > 1)
    .map(([tipo]) => tipo);

  const resistencias = Array.from(multiplicadores.entries())
    .filter(
      ([, multiplicador]) => multiplicador > 0 && multiplicador < 1,
    )
    .map(([tipo]) => tipo);

  const climasFavoraveis = Array.from(
    new Set(
      tipos.flatMap((tipo) => {
        const clima = CLIMA_POR_TIPO[tipo];
        return clima ? [clima] : [];
      }),
    ),
  );

  return { fraquezas, resistencias, climasFavoraveis };
}
