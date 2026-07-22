import React from "react";

// Single grouped bar composed of three segments (atk/def/sta).
// Displays valuesLabel above the bar when showValuesLeft=true.

type GroupedIVBarProps = {
  attack: number;
  defense: number;
  stamina: number;
  showValuesLeft?: boolean; // if true, show '14/15/15' on left
};

export function GroupedIVBar({ attack, defense, stamina, showValuesLeft = false }: GroupedIVBarProps) {
  const valuesLabel = `${attack}/${defense}/${stamina}`;

  // total max is 45 (15*3) -> compute relative widths
  const total = attack + defense + stamina;
  const atkPct = (attack / 45) * 100;
  const defPct = (defense / 45) * 100;
  const staPct = (stamina / 45) * 100;


  // determine which segment is the last filled to round its right corner
  const segments = [
    { name: 'atk', value: attack, pct: atkPct },
    { name: 'def', value: defense, pct: defPct },
    { name: 'sta', value: stamina, pct: staPct },
  ];
  const lastFilledIndex = segments.map(s => s.value).lastIndexOf(0) === -1 ? segments.length - 1 : (() => {
    for (let i = segments.length - 1; i >= 0; i--) {
      if (segments[i].value > 0) return i;
    }
    return -1;
  })();

  return (
    <div className="flex items-start gap-3 w-full">
      {showValuesLeft ? (
        <div className="w-20 text-sm font-medium text-black tabular-nums">{valuesLabel}</div>
      ) : null}

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-xs text-zinc-500">IVs</div>
          <div className="text-xs text-zinc-500 tabular-nums">{valuesLabel}</div>
        </div>

        {/* labels per segment — each segment gets proportional width; hide labels when segment is too small (<8%) */}
        <div className="mb-2 flex w-full text-xs text-zinc-700">
          <div style={{ width: `${atkPct}%`, textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {attack > 0 && atkPct >= 8 ? `Atk ${attack} (${atkPct.toFixed(0)}%)` : ""}
          </div>
          <div style={{ width: `${defPct}%`, textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {defense > 0 && defPct >= 8 ? `Def ${defense} (${defPct.toFixed(0)}%)` : ""}
          </div>
          <div style={{ width: `${staPct}%`, textAlign: "center", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            {stamina > 0 && staPct >= 8 ? `Sta ${stamina} (${staPct.toFixed(0)}%)` : ""}
          </div>
        </div>

        {/* outer bar: empty area contrasting (neutral) */}
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-zinc-100">
          {/* attack segment (red) */}
          {atkPct > 0 ? (
            <div
              className={`absolute left-0 top-0 h-4 transition-all duration-300 bg-red-500 ${lastFilledIndex === 0 ? 'rounded-r-full' : ''}`}
              style={{ width: `${atkPct}%` }}
              aria-hidden
            />
          ) : null}

          {/* defense segment (dark) */}
          {defPct > 0 ? (
            <div
              className={`absolute top-0 h-4 transition-all duration-300 bg-zinc-800 ${lastFilledIndex === 1 ? 'rounded-r-full' : ''}`}
              style={{ left: `${atkPct}%`, width: `${defPct}%` }}
              aria-hidden
            />
          ) : null}

          {/* stamina segment (amber) */}
          {staPct > 0 ? (
            <div
              className={`absolute top-0 h-4 transition-all duration-300 bg-amber-400 ${lastFilledIndex === 2 ? 'rounded-r-full' : ''}`}
              style={{ left: `${atkPct + defPct}%`, width: `${staPct}%` }}
              aria-hidden
            />
          ) : null}

          {/* separators to show internal segment boundaries */}
          {atkPct > 0 && atkPct < 100 ? (
            <div
              className="absolute top-0 h-4 w-px bg-white/70"
              style={{ left: `${atkPct}%`, transform: "translateX(-0.5px)" }}
              aria-hidden
            />
          ) : null}

          {atkPct + defPct > 0 && atkPct + defPct < 100 ? (
            <div
              className="absolute top-0 h-4 w-px bg-white/70"
              style={{ left: `${atkPct + defPct}%`, transform: "translateX(-0.5px)" }}
              aria-hidden
            />
          ) : null}
        </div>

        <div className="mt-1 flex items-end justify-end text-xs text-zinc-500">
          <div className="tabular-nums">{total}/45</div>
        </div>
      </div>
    </div>
  );
}
