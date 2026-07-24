import { Search } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex items-center justify-center gap-2 py-8 text-sm text-muted-foreground">
      <Search className="h-4 w-4" />
      Pesquise um Pokémon para visualizar suas informações estratégicas.
    </div>
  );
}