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
    <SectionCard title="Decisão">
      <div className="flex flex-wrap gap-3">
        {pokemon.decisoes.map((decisao) => {
          const titulo = decisao.titulo
            .replace("Vale ", "")
            .trim();

          const tituloFormatado =
            titulo.charAt(0).toUpperCase() +
            titulo.slice(1);

          return (
            <div
              key={decisao.titulo}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2"
            >
              <span>{obterIcone(decisao.status)}</span>

              <span className="text-sm font-medium">
                {tituloFormatado}
              </span>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}