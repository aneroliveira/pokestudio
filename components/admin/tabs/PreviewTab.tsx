import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { JsonPreview } from "@/components/admin/JsonPreview";
import { FormSection } from "@/components/admin/FormSection";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";
import { CLIMA_LABEL } from "@/constants/typeLabels";

type PreviewTabProps = {
  pokemon: Pokemon;
};

function Chips({ itens }: { itens: string[] }) {
  if (itens.length === 0) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {itens.map((item) => (
        <span
          key={item}
          className="rounded-full bg-muted px-3 py-1 text-sm"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function IconesTipo({
  tipos,
  className,
}: {
  tipos: TipoPokemon[];
  className: string;
}) {
  if (tipos.length === 0) {
    return <span className="text-sm text-muted-foreground">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tipos.map((tipo) => (
        <TypeIcon key={tipo} tipo={tipo} className={className} />
      ))}
    </div>
  );
}

export function PreviewTab({ pokemon }: PreviewTabProps) {
  const { fraquezas, resistencias, climasFavoraveis } = calcularDerivados(
    pokemon.oficial.tipos,
  );

  return (
    <div className="space-y-8">
      <FormSection title="🧮 Derivados (calculado)">
        <p className="text-xs text-muted-foreground">
          Calculado a partir dos tipos. Nunca é persistido. O card ao vivo
          está sempre visível ao lado.
        </p>

        <div className="space-y-1">
          <p className="text-sm font-medium">Fraquezas</p>
          <IconesTipo tipos={fraquezas} className="bg-bad" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Resistências</p>
          <IconesTipo tipos={resistencias} className="bg-good" />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Climas favoráveis</p>
          <Chips
            itens={climasFavoraveis.map((clima) => CLIMA_LABEL[clima])}
          />
        </div>
      </FormSection>

      <JsonPreview pokemon={pokemon} />
    </div>
  );
}
