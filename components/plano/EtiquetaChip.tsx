import { cn } from "@/lib/utils";

type EtiquetaChipProps = {
  etiqueta: string;
  className?: string;
};

/**
 * A etiqueta é literalmente o texto digitado na lupa do Pokémon GO, então
 * é renderizada em monoespaçada e sem tradução — inclusive quando diverge
 * do rótulo do app (RAID-TERRESTRE vs. "Terra", em TIPO_LABEL).
 */
export function EtiquetaChip({ etiqueta, className }: EtiquetaChipProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-md bg-secondary px-2 py-0.5 font-mono text-[11px] font-medium leading-5 text-secondary-foreground",
        className,
      )}
    >
      {etiqueta}
    </span>
  );
}
