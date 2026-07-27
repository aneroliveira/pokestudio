import Image from "next/image";
import type { Pokemon } from "@/models/pokemon";
import { FormSection } from "@/components/admin/FormSection";

type GeralTabProps = {
  pokemon: Pokemon;
};

function Campo({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{valor || "—"}</p>
    </div>
  );
}

export function GeralTab({ pokemon }: GeralTabProps) {
  const { numero, nome, regiao, imagem } = pokemon.oficial;
  const dadosImportados = numero !== "";

  return (
    <FormSection title="📌 Identificação">
      <div className="flex items-center gap-4">
        {imagem ? (
          <Image
            src={imagem}
            alt={nome.ptBR || "Pokémon"}
            width={56}
            height={56}
            className="shrink-0 rounded-lg bg-muted"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-muted text-xs text-muted-foreground">
            —
          </div>
        )}

        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3">
          <Campo label="Número" valor={numero} />
          <Campo label="Nome" valor={nome.ptBR} />
          <Campo label="Região" valor={regiao} />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {dadosImportados
          ? "Sincronizado da PokéAPI — não editável aqui."
          : "Sincronize um Pokémon na aba Sincronização."}
      </p>
    </FormSection>
  );
}
