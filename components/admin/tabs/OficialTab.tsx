import type { Pokemon } from "@/models/pokemon";
import { TIPO_LABEL } from "@/constants/typeLabels";
import { FormSection } from "@/components/admin/FormSection";

type OficialTabProps = {
  pokemon: Pokemon;
};

export function OficialTab({ pokemon }: OficialTabProps) {
  const { tipos, evolucao } = pokemon.oficial;

  return (
    <div className="space-y-6">
      <FormSection title="⚔️ Tipos">
        {tipos.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tipos.map((tipo) => (
              <span
                key={tipo}
                className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground"
              >
                {TIPO_LABEL[tipo]}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum tipo sincronizado.</p>
        )}
        <p className="text-xs text-muted-foreground">Sincronizado da PokéAPI.</p>
      </FormSection>

      <FormSection title="🧬 Evolução">
        <p className="text-sm text-foreground/80">
          <span className="font-medium">Anteriores:</span>{" "}
          {evolucao.anteriores.length > 0
            ? evolucao.anteriores.map((e) => e.nome).join(", ")
            : "—"}
        </p>
        <p className="text-sm text-foreground/80">
          <span className="font-medium">Próximas:</span>{" "}
          {evolucao.proximas.length > 0
            ? evolucao.proximas.map((e) => e.nome).join(", ")
            : "—"}
        </p>
        <p className="text-xs text-muted-foreground">
          Sincronizado da PokéAPI.
        </p>
      </FormSection>
    </div>
  );
}
