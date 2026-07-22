import type { Pokemon } from "@/models/pokemon";
import { JsonPreview } from "@/components/admin/JsonPreview";
import { FormSection } from "@/components/admin/FormSection";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";
import { TIPO_LABEL, CLIMA_LABEL } from "@/constants/typeLabels";

type PreviewTabProps = {
  pokemon: Pokemon;
};

function Chips({ itens }: { itens: string[] }) {
  if (itens.length === 0) {
    return <span className="text-sm text-zinc-400">—</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {itens.map((item) => (
        <span
          key={item}
          className="rounded-full bg-zinc-100 px-3 py-1 text-sm"
        >
          {item}
        </span>
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
        <p className="text-xs text-zinc-400">
          Calculado a partir dos tipos. Nunca é persistido. O card ao vivo
          está sempre visível ao lado.
        </p>

        <div className="space-y-1">
          <p className="text-sm font-medium">Fraquezas</p>
          <Chips itens={fraquezas.map((tipo) => TIPO_LABEL[tipo])} />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Resistências</p>
          <Chips itens={resistencias.map((tipo) => TIPO_LABEL[tipo])} />
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
