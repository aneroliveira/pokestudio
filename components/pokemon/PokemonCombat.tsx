import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";

type PokemonCombatProps = {
  pokemon: Pokemon;
};

export function PokemonCombat({ pokemon }: PokemonCombatProps) {
  const { fraquezas, resistencias } = calcularDerivados(
    pokemon.oficial.tipos,
  );

  return (
    <SectionCard title="Combate">

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-2 font-medium text-good-foreground">
            🟢 Bom contra
          </h3>

          <div className="flex flex-wrap gap-2">
            {resistencias.map((tipo) => (
              <TypeIcon key={tipo} tipo={tipo} className="bg-good" />
            ))}
          </div>
        </div>

        <div className="border-l border-border pl-4">
          <h3 className="mb-2 font-medium text-bad-foreground">
            🔴 Ruim contra
          </h3>

          <div className="flex flex-wrap gap-2">
            {fraquezas.map((tipo) => (
              <TypeIcon key={tipo} tipo={tipo} className="bg-bad" />
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
);
}
