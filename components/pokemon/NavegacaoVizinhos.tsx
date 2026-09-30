import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ItemIndicePokemon } from "@/models/indice";
import { buscarVizinhos } from "@/services/pokemon/buscarPokemon";

type NavegacaoVizinhosProps = {
  numero: string;
  onSelect: (item: ItemIndicePokemon) => void;
  desabilitado?: boolean;
};

/** Barra "← anterior / próximo →" em cima do card, pra folhear a Pokédex
 *  nacional sem voltar pra busca. Nas bordas (#001 e o último) o lado sem
 *  vizinho fica vazio, mas mantém o espaço pra barra não pular de lugar. */
export function NavegacaoVizinhos({
  numero,
  onSelect,
  desabilitado = false,
}: NavegacaoVizinhosProps) {
  const { anterior, proximo } = buscarVizinhos(numero);

  if (!anterior && !proximo) return null;

  // Cores diferentes pra cada lado: voltar é neutro, avançar puxa a cor
  // primária — dá pra saber o sentido de relance, sem ler a seta.
  const classeBotao =
    "flex min-w-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50";
  const classeAnterior =
    "border-border bg-secondary text-secondary-foreground hover:border-foreground/30";
  const classeProximo =
    "justify-end border-primary/30 bg-primary/10 text-primary hover:border-primary/60 hover:bg-primary/15";

  return (
    <nav
      aria-label="Navegar pela Pokédex"
      className="flex items-center justify-between gap-3"
    >
      {anterior ? (
        <button
          type="button"
          onClick={() => onSelect(anterior)}
          disabled={desabilitado}
          className={cn(classeBotao, classeAnterior)}
          aria-label={`Anterior: ${anterior.nomeEn}`}
        >
          <ChevronLeft className="h-4 w-4 shrink-0" />
          <span className="shrink-0 text-xs tabular-nums">
            {anterior.numero}
          </span>
          <span className="truncate capitalize">{anterior.nomeEn}</span>
        </button>
      ) : (
        <span />
      )}

      {proximo ? (
        <button
          type="button"
          onClick={() => onSelect(proximo)}
          disabled={desabilitado}
          className={cn(classeBotao, classeProximo)}
          aria-label={`Próximo: ${proximo.nomeEn}`}
        >
          <span className="truncate capitalize">{proximo.nomeEn}</span>
          <span className="shrink-0 text-xs tabular-nums">
            {proximo.numero}
          </span>
          <ChevronRight className="h-4 w-4 shrink-0" />
        </button>
      ) : (
        <span />
      )}
    </nav>
  );
}
