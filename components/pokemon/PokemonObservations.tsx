import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";


type PokemonObservationsProps = {
  pokemon: Pokemon;
};

export function PokemonObservations({
  pokemon,
}: PokemonObservationsProps) {
  return (
    <SectionCard title="Observações">

      <ul className="list-disc space-y-2 pl-5">
        {pokemon.studio.conhecimento.observacoes.map((observacao) => (
          <li key={observacao}>
            {observacao}
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}