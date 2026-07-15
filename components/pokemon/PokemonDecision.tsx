import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { RecommendationChip } from "@/components/ui/RecommendationChip";

type PokemonDecisionProps = {
  pokemon: Pokemon;
  emptyMessage?: string;
};

export function PokemonDecision({
  pokemon,
  emptyMessage,
}: PokemonDecisionProps) {
  if (pokemon.decisoes.length === 0) {
    return emptyMessage ? (
      <SectionCard title="">
        <p className="text-sm text-zinc-500">
          {emptyMessage}
        </p>
      </SectionCard>
    ) : null;
  }

  return (
    <SectionCard title="">
      <div className="flex flex-wrap gap-3">
        {pokemon.decisoes.map((decisao) => {
          const titulo = decisao.titulo
            .replace("Vale ", "")
            .trim();

          const tituloFormatado =
            titulo.charAt(0).toUpperCase() +
            titulo.slice(1);

          return (
            <RecommendationChip
              key={decisao.titulo}
              status={decisao.status}
              label={tituloFormatado}
            />
          );
        })}
      </div>
    </SectionCard>
  );
}