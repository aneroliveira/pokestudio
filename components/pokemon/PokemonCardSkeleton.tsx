import { Card } from "@/components/ui/Card";

function Bloco({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-zinc-200 ${className}`}
    />
  );
}

export function PokemonCardSkeleton() {
  return (
    <Card>
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 space-y-3">
          <Bloco className="h-4 w-16" />
          <Bloco className="h-8 w-40" />
          <div className="flex gap-2">
            <Bloco className="h-6 w-20" />
            <Bloco className="h-6 w-20" />
          </div>
          <Bloco className="h-4 w-32" />
        </div>
        <Bloco className="h-[120px] w-[120px] shrink-0" />
      </div>

      <div className="mt-6 space-y-2">
        <Bloco className="h-6 w-full" />
        <Bloco className="h-6 w-3/4" />
      </div>
    </Card>
  );
}
