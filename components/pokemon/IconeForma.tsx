import { cn } from "@/lib/utils";

export type Forma = "shiny" | "mega" | "gigamax";

type IconeFormaProps = {
  forma: Forma;
  className?: string;
};

/**
 * Ícones do próprio Pokémon GO pros chips de forma (RFC-006), em
 * `public/icones/`: shiny e Mega vêm do PokeMiners/pogo_assets, o de
 * Gigamax da wiki do Pokémon GO (Fandom). O de shiny é usado como máscara,
 * pintado de amarelo (no cinza do chip ele parecia preto); Mega e Gigamax
 * mantêm as cores originais, que são a identidade deles no jogo. Ligado ou
 * desligado, quem mostra o estado é a borda do chip.
 */
export function IconeForma({ forma, className }: IconeFormaProps) {
  const classeBase = cn("inline-block h-4 w-4 shrink-0", className);

  if (forma === "shiny") {
    return (
      <span
        aria-hidden
        className={cn(classeBase, "bg-yellow-500 dark:bg-yellow-400")}
        style={{
          maskImage: "url(/icones/shiny.png)",
          WebkitMaskImage: "url(/icones/shiny.png)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- ícone de 14px, sem ganho com next/image
    <img
      src={forma === "mega" ? "/icones/mega.png" : "/icones/gigamax.png"}
      alt=""
      aria-hidden
      className={cn(classeBase, "object-contain")}
    />
  );
}
