import type { ClimaPokemon, TipoPokemon } from "@/models/pokemon";
import { RELACOES_DEFENSIVAS } from "@/constants/typeChart";
import { CLIMA_POR_TIPO } from "@/constants/typeWeather";
import { calcularEfetividadeOfensiva } from "./efetividade";

export interface DerivadosCalculados {
  // Defensivo — dano que o Pokémon RECEBE:
  fraquezas: TipoPokemon[]; // recebe > 1× (teme)
  resistencias: TipoPokemon[]; // recebe entre 0 e 1× (aguenta)
  imunidades: TipoPokemon[]; // recebe 0× (não sofre)
  // Ofensivo — dano que o Pokémon CAUSA com golpes STAB. Usa o melhor
  // multiplicador entre os tipos do Pokémon (escolhe-se o golpe ideal):
  fortesContra: TipoPokemon[]; // causa > 1× (supereficaz)
  fracosContra: TipoPokemon[]; // causa < 1× (resistido ou nulo)
  climasFavoraveis: ClimaPokemon[];
}

const TODOS_OS_TIPOS = Object.keys(
  RELACOES_DEFENSIVAS,
) as TipoPokemon[];

/**
 * Calcula os dados derivados de um Pokémon a partir dos seus tipos.
 *
 * RFC-001 — dados derivados nunca são persistidos; sempre calculados.
 *
 * Defesa: multiplica os fatores defensivos de cada tipo (×2 fraqueza, ×0.5
 * resistência, ×0 imunidade) — fraquezas têm multiplicador > 1, resistências
 * 0 < multiplicador < 1 e imunidades multiplicador 0.
 * Ataque: derivado da efetividade ofensiva (fonte única em `efetividade.ts`).
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

  const imunidades = Array.from(multiplicadores.entries())
    .filter(([, multiplicador]) => multiplicador === 0)
    .map(([tipo]) => tipo);

  // Ofensivo: para cada tipo alvo, o melhor multiplicador entre os tipos do
  // Pokémon (escolhe-se o golpe STAB mais eficaz). Fonte única: efetividade.ts.
  const fortesContra: TipoPokemon[] = [];
  const fracosContra: TipoPokemon[] = [];

  if (tipos.length > 0) {
    for (const alvo of TODOS_OS_TIPOS) {
      const melhor = Math.max(
        ...tipos.map((tipo) =>
          calcularEfetividadeOfensiva(tipo, [alvo]),
        ),
      );

      if (melhor > 1) fortesContra.push(alvo);
      else if (melhor < 1) fracosContra.push(alvo);
    }
  }

  const climasFavoraveis = Array.from(
    new Set(
      tipos.flatMap((tipo) => {
        const clima = CLIMA_POR_TIPO[tipo];
        return clima ? [clima] : [];
      }),
    ),
  );

  return {
    fraquezas,
    resistencias,
    imunidades,
    fortesContra,
    fracosContra,
    climasFavoraveis,
  };
}
