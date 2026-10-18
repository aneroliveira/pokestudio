import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MiniaturaEvento } from "@/services/eventos/miniaturasEvento";

type MiniaturasEventoProps = {
  miniaturas: MiniaturaEvento[];
  className?: string;
};

const CIRCULO =
  "relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border bg-secondary ring-2 ring-card sm:h-11 sm:w-11";

/** Pilha de até 3 Pokémon do evento, um sobrepondo o outro — fica à
 *  esquerda do título na lista e no dia expandido do calendário. A largura
 *  é fixa (cabe 3) pra os títulos alinharem entre cards; no celular só o
 *  primeiro aparece, senão o título quebra em várias linhas. Evento ainda
 *  sem Pokémon anunciado mostra um "?" no lugar. */
export function MiniaturasEvento({ miniaturas, className }: MiniaturasEventoProps) {
  return (
    <div
      className={cn("flex w-9 shrink-0 -space-x-4 sm:w-[5.75rem]", className)}
      aria-hidden
    >
      {miniaturas.length === 0 ? (
        <div className={cn(CIRCULO, "flex items-center justify-center")}>
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </div>
      ) : (
        miniaturas.map((item, indice) => (
          <div
            key={item.nome}
            title={item.nome}
            className={cn(CIRCULO, indice > 0 && "hidden sm:block")}
          >
            <Image
              src={item.imagem}
              alt=""
              fill
              sizes="44px"
              className="object-contain p-0.5"
              style={item.escala ? { transform: `scale(${item.escala})` } : undefined}
            />
          </div>
        ))
      )}
    </div>
  );
}
