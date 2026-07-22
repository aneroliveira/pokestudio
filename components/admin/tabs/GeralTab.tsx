import Image from "next/image";
import type { Pokemon } from "@/models/pokemon";
import { FormSection } from "@/components/admin/FormSection";

type GeralTabProps = {
  pokemon: Pokemon;
};

function Campo({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-zinc-400">
        {label}
      </p>
      <p className="text-sm font-medium text-zinc-800">{valor || "—"}</p>
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
            className="shrink-0 rounded-lg bg-zinc-50"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-50 text-xs text-zinc-400">
            —
          </div>
        )}

        <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
          <Campo label="Número" valor={numero} />
          <Campo label="Nome (pt-BR)" valor={nome.ptBR} />
          <Campo label="Nome (en-US)" valor={nome.enUS} />
          <Campo label="Região" valor={regiao} />
        </div>
      </div>

      <p className="text-xs text-zinc-400">
        {dadosImportados
          ? "Sincronizado da PokéAPI — não editável aqui."
          : "Sincronize um Pokémon na aba Sincronização."}
      </p>
    </FormSection>
  );
}
