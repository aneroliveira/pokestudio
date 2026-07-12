import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
      <Search className="mb-4 h-10 w-10 text-zinc-400" />

      <h2 className="text-xl font-semibold">
        Nenhum Pokémon selecionado
      </h2>

      <p className="mt-2 max-w-md text-sm text-zinc-500">
        Pesquise um Pokémon para visualizar suas informações estratégicas.
      </p>
    </div>
  );
}