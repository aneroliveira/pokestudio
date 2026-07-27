import type { Pokemon } from "@/models/pokemon";
import { FormSection } from "@/components/admin/FormSection";
import { FormaMiniatura } from "@/components/admin/FormaMiniatura";

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
                className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2 text-sm"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <FormaMiniatura src={forma.sprite} alt={forma.nome} />
                  <span className="truncate">{forma.nome}</span>
                </span>
                <span className="shrink-0 text-muted-foreground">
                  {forma.categoria}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">
            Nenhuma forma sincronizada.
          </p>
        )}
        <p className="text-xs text-muted-foreground">Sincronizado da PokéAPI.</p>
      </FormSection>

      <FormSection title="🎯 Movepool">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Rápidos:</span>{" "}
          {movepool.rapidos.length > 0
            ? movepool.rapidos.join(", ")
            : "—"}
        </p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Carregados:</span>{" "}
          {movepool.carregados.length > 0
            ? movepool.carregados.join(", ")
            : "—"}
        </p>
      </FormSection>
    </div>
  );
}
