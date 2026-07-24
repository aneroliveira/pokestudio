import type { Pokemon } from "@/models/pokemon";
import { FormSection } from "@/components/admin/FormSection";

type FormsTabProps = {
  pokemon: Pokemon;
};

export function FormsTab({ pokemon }: FormsTabProps) {
  const { formas, movepool } = pokemon.oficial;

  return (
    <div className="space-y-6">
      <FormSection title="✨ Formas">
        {formas.length > 0 ? (
          <ul className="space-y-2">
            {formas.map((forma) => (
              <li
                key={forma.id}
                className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm"
              >
                <span>{forma.nome}</span>
                <span className="text-zinc-500">{forma.categoria}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-zinc-500">
            Nenhuma forma sincronizada.
          </p>
        )}
        <p className="text-xs text-zinc-400">Sincronizado da PokéAPI.</p>
      </FormSection>

      <FormSection title="🎯 Movepool">
        <p className="text-sm text-zinc-600">
          <span className="font-medium">Rápidos:</span>{" "}
          {movepool.rapidos.length > 0
            ? movepool.rapidos.join(", ")
            : "—"}
        </p>
        <p className="text-sm text-zinc-600">
          <span className="font-medium">Carregados:</span>{" "}
          {movepool.carregados.length > 0
            ? movepool.carregados.join(", ")
            : "—"}
        </p>
      </FormSection>
    </div>
  );
}
