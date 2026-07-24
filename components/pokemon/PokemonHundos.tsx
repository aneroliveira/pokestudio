import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { calcularHundosPorNumero } from "@/services/pokemon/statsGO";

type PokemonHundosProps = {
  pokemon: Pokemon;
};

export function PokemonHundos({ pokemon }: PokemonHundosProps) {
  const calculado = calcularHundosPorNumero(pokemon.oficial.numero);
  const { hundos, quaseHundos } = pokemon.studio.go;

  const semClima = hundos.semClima || calculado?.semClima;
  const comClima = hundos.comClima || calculado?.comClima;
  const iv98 = quaseHundos.iv98 || calculado?.quaseHundos.iv98;
  const iv96 = quaseHundos.iv96 || calculado?.quaseHundos.iv96;

  const usandoCalculado =
    !!calculado &&
    !hundos.semClima &&
    !hundos.comClima &&
    !quaseHundos.iv98 &&
    !quaseHundos.iv96;

  return (
    <SectionCard title="Hundos">
      <div className="space-y-2">
        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          100%
        </h3>
        {semClima && (
          <InfoRow
            label="Sem clima"
            value={semClima}
          />
        )}

        {comClima && (
          <InfoRow
            label="Com clima"
            value={comClima}
          />
        )}

        <hr className="my-3" />

        <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-400">
          Quase Hundos
        </h3>

        {iv98 && (
          <InfoRow
            label="98%"
            value={iv98}
          />
        )}

        {iv96 && (
          <InfoRow
            label="96%"
            value={iv96}
          />
        )}

        {usandoCalculado && (
          <p className="text-xs text-muted-foreground">
            🧮 Estimado a partir das base stats do GO.
          </p>
        )}
      </div>
    </SectionCard>
  );
}
