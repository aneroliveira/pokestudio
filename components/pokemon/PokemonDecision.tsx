import type {
  Pokemon,
  StatusDecisao,
} from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";

type PokemonDecisionProps = {
  pokemon: Pokemon;
};

function obterIcone(status: StatusDecisao) {
  switch (status) {
    case "sim":
      return "✅";

    case "atencao":
      return "⚠️";

    case "nao":
      return "❌";
  }
}

export function PokemonDecision({
  pokemon,
}: PokemonDecisionProps) {
  return (
    <SectionCard title="Decisao">

      <div className="space-y-2">
        {pokemon.decisoes.map((decisao) => (
          <div
            key={decisao.titulo}
            className="flex items-center gap-2"
          >
            <span>{obterIcone(decisao.status)}</span>

            <span>{decisao.titulo}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}