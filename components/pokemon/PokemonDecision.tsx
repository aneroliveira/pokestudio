import type {
  Pokemon,
  StatusDecisao,
} from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { RecommendationChip } from "@/components/ui/RecommendationChip";

type PokemonDecisionProps = {
  pokemon: Pokemon;
};


export function PokemonDecision({
  pokemon,
}: PokemonDecisionProps) {
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