import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { recomendarMegasContra } from "@/services/pokemon/recomendarMega";
import { TIPO_LABEL } from "@/constants/typeLabels";

const LIMITE = 3;

type PokemonMegasProps = {
  pokemon: Pokemon;
};

export function PokemonMegas({ pokemon }: PokemonMegasProps) {
  const recomendadas = recomendarMegasContra(pokemon.oficial.tipos, {
    limite: LIMITE,
  });

  return (
    <SectionCard title="Melhor Mega contra">
      {recomendadas.length === 0 ? (
        <p className="text-sm text-gray-500">
          Nenhuma Mega super efetiva conhecida.
        </p>
      ) : (
        <ul className="space-y-2">
          {recomendadas.map(({ mega, melhorTipo, efetividade }) => (
            <li
              key={mega.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-purple-50 px-3 py-2"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{mega.nome}</span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm">
                  {TIPO_LABEL[melhorTipo]}
                </span>
              </div>

              <span className="shrink-0 font-semibold text-purple-700">
                {efetividade}×
              </span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
