export interface BaseStatsGO {
  attack: number;
  defense: number;
  stamina: number;
}

export interface IVsGO {
  attack: number;
  defense: number;
  stamina: number;
}

export interface SearchIvResultado {
  nivelEstimado: number;
  comparativo: Array<{
    label: string;
    ivs: IVsGO;
    cp: number;
  }>;
}

const CLIMA_FACTOR = 1.08;

function getCpMultiplier(level: number) {
  if (level <= 15) {
    return 0.094 + (level - 1) * 0.03;
  }

  if (level <= 30) {
    return 0.517 + (level - 15) * 0.018;
  }

  if (level <= 40) {
    return 0.787 + (level - 30) * 0.012;
  }

  return 0.907 + (level - 40) * 0.01;
}

export function calcularCp(
  baseStats: BaseStatsGO,
  level: number,
  ivs: IVsGO,
  comClima = false,
) {
  const attackTotal = baseStats.attack + ivs.attack;
  const defenseTotal = baseStats.defense + ivs.defense;
  const staminaTotal = baseStats.stamina + ivs.stamina;
  const multiplier = getCpMultiplier(level);

  const cpBase = Math.floor(
    (attackTotal * Math.sqrt(defenseTotal) * Math.sqrt(staminaTotal) * multiplier * multiplier) / 10,
  );

  if (!comClima) {
    return cpBase;
  }

  return Math.round(cpBase * CLIMA_FACTOR);
}

export function estimarNivel(
  baseStats: BaseStatsGO,
  cpAlvo: number,
  ivs: IVsGO,
  comClima = false,
) {
  const cpAjustado = comClima ? cpAlvo / CLIMA_FACTOR : cpAlvo;

  let minLevel = 1;
  let maxLevel = 40;

  for (let index = 0; index < 40; index += 1) {
    const midLevel = (minLevel + maxLevel) / 2;
    const cpSimulado = calcularCp(baseStats, midLevel, ivs, false);

    if (cpSimulado < cpAjustado) {
      minLevel = midLevel;
    } else {
      maxLevel = midLevel;
    }
  }

  return Number(((minLevel + maxLevel) / 2).toFixed(1));
}

export function gerarResultadoSearchIv(
  baseStats: BaseStatsGO,
  cpAlvo: number,
  ivs: IVsGO,
  comClima = false,
): SearchIvResultado {
  const nivelEstimado = estimarNivel(baseStats, cpAlvo, ivs, comClima);

  const benchmarks = [
    { label: "100%", ivs: { attack: 15, defense: 15, stamina: 15 } },
    { label: "98%", ivs: { attack: 15, defense: 15, stamina: 14 } },
    { label: "96%", ivs: { attack: 15, defense: 14, stamina: 14 } },
  ];

  return {
    nivelEstimado,
    comparativo: benchmarks.map((benchmark) => ({
      label: benchmark.label,
      ivs: benchmark.ivs,
      cp: calcularCp(baseStats, nivelEstimado, benchmark.ivs, comClima),
    })),
  };
}
