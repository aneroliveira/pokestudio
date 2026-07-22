import type { TipoPokemon } from "@/models/pokemon";
import { TIPO_LABEL } from "@/constants/typeLabels";

type TypeBadgeProps = {
  tipo: TipoPokemon;
};

export function TypeBadge({
  tipo,
}: TypeBadgeProps) {
  return (
    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium">
      {TIPO_LABEL[tipo]}
    </span>
  );
}
