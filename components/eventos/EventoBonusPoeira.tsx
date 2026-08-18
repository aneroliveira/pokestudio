import { Gem, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { EVENTO_TEMA, type TemaEvento } from "@/constants/eventoTemas";
import type { JanelaBonus } from "@/models/evento";

type EventoBonusPoeiraProps = {
  janelas: JanelaBonus[];
  dica?: string;
  tema: TemaEvento;
};

export function EventoBonusPoeira({ janelas, dica, tema }: EventoBonusPoeiraProps) {
  const preset = EVENTO_TEMA[tema];

  return (
    <Card
      className={`relative overflow-hidden border-primary/30 bg-linear-to-br from-primary/5 via-card ring-1 ring-primary/20 dark:from-primary/10 ${preset.destaqueGradiente}`}
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Gem className="h-4 w-4 text-primary" />
        Bônus de Poeira Estelar
      </h2>

      <div className="mt-4 overflow-x-auto">
        {/* Sem min-width: só 3 colunas curtas, cabe direto no celular sem
            exigir swipe pra ver XP/Poeira. */}
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted-foreground">
              <th className="pb-2 pr-3 font-medium">Janela</th>
              <th className="pb-2 pr-3 font-medium">XP</th>
              <th className="pb-2 font-medium">Poeira</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {janelas.map((janela) => (
              <tr
                key={janela.janela}
                className={janela.pico ? "bg-primary/5 dark:bg-primary/10" : undefined}
              >
                <td className="py-2.5 pr-3 font-medium">
                  {janela.janela}
                  {janela.pico && <span className="ml-2">✨</span>}
                </td>
                <td className="py-2.5 pr-3 text-muted-foreground">{janela.xp}</td>
                <td
                  className={
                    janela.pico
                      ? "py-2.5 font-semibold text-primary"
                      : "py-2.5 text-muted-foreground"
                  }
                >
                  {janela.poeira}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dica && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-primary/10 px-3 py-2.5 text-sm text-foreground/90 dark:bg-primary/15">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>
            <strong>Dica:</strong> {dica}
          </span>
        </div>
      )}
    </Card>
  );
}
