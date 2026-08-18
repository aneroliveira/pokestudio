import Link from "next/link";
import { ArrowRight, NotebookPen } from "lucide-react";
import { Card } from "@/components/ui/Card";

type EventoNotaCuradoriaProps = {
  texto: string;
  linkPlano?: boolean;
};

export function EventoNotaCuradoria({ texto, linkPlano }: EventoNotaCuradoriaProps) {
  return (
    <Card className="relative overflow-hidden border-primary/30 bg-linear-to-br from-primary/10 via-accent/50 to-transparent dark:from-primary/15 dark:via-accent/30">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <NotebookPen className="h-4 w-4" />
        Nota da Lori
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/90">{texto}</p>

      {linkPlano && (
        <Link
          href="/plano"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Ver o plano completo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </Card>
  );
}
