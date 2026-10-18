import Image from "next/image";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MiniaturaEvento } from "@/services/eventos/miniaturasEvento";

type MiniaturasEventoProps = {
  miniaturas: MiniaturaEvento[];
  className?: string;
};

const CIRCULO =
  "relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border bg-secondary sm:h-9 sm:w-9";

/** Todos os Pokémon do evento numa linha que quebra — fica embaixo do
 *  período, na lista e no dia expandido do calendário. Evento ainda sem
 *  Pokémon anunciado mostra um "?" no lugar. */
export function MiniaturasEvento({ miniaturas, className }: MiniaturasEventoProps) {
  return (
    <div className={cn("flex flex-wrap gap-1", className)} aria-hidden>
      {miniaturas.length === 0 ? (
        <div
          title="Pokémon ainda não anunciados"
          className={cn(CIRCULO, "flex items-center justify-center")}
        >
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </div>
      ) : (
        miniaturas.map((item) => (
          <div key={item.nome} title={item.nome} className={CIRCULO}>
            <Image
              src={item.imagem}
              alt=""
              fill
              sizes="36px"
              className="object-contain p-0.5"
              style={item.escala ? { transform: `scale(${item.escala})` } : undefined}
            />
          </div>
        ))
      )}
    </div>
  );
}
