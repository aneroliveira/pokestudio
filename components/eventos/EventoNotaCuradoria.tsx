import Link from "next/link";
import { ArrowRight, NotebookPen } from "lucide-react";
import { Card } from "@/components/ui/Card";

type EventoNotaCuradoriaProps = {
  texto: string;
  linkPlano?: boolean;
};

type BlocoTexto =
  | { tipo: "paragrafo"; linhas: string[] }
  | { tipo: "lista"; linhas: string[] };

/**
 * Markdown bem light: linha começando com "- " vira item de lista (itens
 * consecutivos se agrupam num <ul> só), qualquer outra linha vira um <p>
 * próprio. Suficiente pra notas com comparação de opções sem puxar uma lib
 * de markdown só pra isso — linhas em branco só separam blocos.
 */
function montarBlocos(texto: string): BlocoTexto[] {
  const blocos: BlocoTexto[] = [];

  for (const bruta of texto.split("\n")) {
    const linha = bruta.trim();
    if (!linha) continue;

    const éItem = linha.startsWith("- ");
    const conteudo = éItem ? linha.slice(2) : linha;
    const ultimo = blocos[blocos.length - 1];

    if (éItem && ultimo?.tipo === "lista") {
      ultimo.linhas.push(conteudo);
    } else {
      blocos.push({ tipo: éItem ? "lista" : "paragrafo", linhas: [conteudo] });
    }
  }

  return blocos;
}

export function EventoNotaCuradoria({ texto, linkPlano }: EventoNotaCuradoriaProps) {
  const blocos = montarBlocos(texto);

  return (
    <Card className="relative overflow-hidden border-primary/30 bg-linear-to-br from-primary/10 via-accent/50 to-transparent dark:from-primary/15 dark:via-accent/30">
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <NotebookPen className="h-4 w-4" />
        Nota da Lori
      </div>

      <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/90">
        {blocos.map((bloco, i) =>
          bloco.tipo === "lista" ? (
            <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-primary/70">
              {bloco.linhas.map((linha, j) => (
                <li key={j}>{linha}</li>
              ))}
            </ul>
          ) : (
            <p key={i}>{bloco.linhas[0]}</p>
          ),
        )}
      </div>

      {linkPlano && (
        <Link
          href="/admin?aba=Plano"
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Ver o plano completo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </Card>
  );
}
