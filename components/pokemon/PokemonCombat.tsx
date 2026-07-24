import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";
import { TIPO_LABEL } from "@/constants/typeLabels";

type PokemonCombatProps = {
  pokemon: Pokemon;
};

export function PokemonCombat({ pokemon }: PokemonCombatProps) {
  const { fraquezas, resistencias } = calcularDerivados(
    pokemon.oficial.tipos,
  );

  return (
    <SectionCard title="Combate">

      <div className="space-y-5">
        <div>
          <h3 className="mb-2 font-medium text-good-foreground">
            🟢 Bom contra
          </h3>

          <div className="flex flex-wrap gap-2">
            {resistencias.map((tipo) => (
              <span
                key={tipo}
                className="rounded-full bg-good px-3 py-1 text-sm text-good-foreground"
              >
                {TIPO_LABEL[tipo]}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-medium text-bad-foreground">
            🔴 Ruim contra
          </h3>

          <div className="flex flex-wrap gap-2">
            {fraquezas.map((tipo) => (
              <span
                key={tipo}
                className="rounded-full bg-bad px-3 py-1 text-sm text-bad-foreground"
              >
                {TIPO_LABEL[tipo]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
);
}
