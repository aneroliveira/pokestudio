"use client";

import { Check, Lock } from "lucide-react";

import { Card } from "@/components/ui/Card";
import type { BloqueioPlano, PassoPlano } from "@/models/plano";

type OrdemExecucaoProps = {
  passos: PassoPlano[];
  bloqueios: BloqueioPlano[];
  onAlternar: (id: string, concluido: boolean) => void;
  salvando: boolean;
  erro: string | null;
};

export function OrdemExecucao({
  passos,
  bloqueios,
  onAlternar,
  salvando,
  erro,
}: OrdemExecucaoProps) {
  const feitos = passos.filter((passo) => passo.concluido).length;
  const total = passos.length;
  const progresso = total === 0 ? 0 : Math.round((feitos / total) * 100);

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold">Ordem de execução</h2>

          <span className="text-sm text-muted-foreground">
            {feitos} de {total} concluídos
            {salvando && " · salvando..."}
          </span>
        </div>

        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-valuenow={progresso}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progresso do plano"
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progresso}%` }}
          />
        </div>

        {erro && (
          <p className="mt-3 rounded-lg bg-bad px-3 py-2 text-sm text-bad-foreground">
            {erro}
          </p>
        )}

        <ol className="mt-4 space-y-1">
          {passos.map((passo, indice) => (
            <li key={passo.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-accent">
                <input
                  type="checkbox"
                  checked={passo.concluido}
                  onChange={(evento) =>
                    onAlternar(passo.id, evento.target.checked)
                  }
                  className="peer sr-only"
                />

                {/* O input real é sr-only, então o foco de teclado precisa
                    aparecer neste quadrado — senão quem navega por Tab
                    percorre a lista às cegas. */}
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card ${
                    passo.concluido
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background"
                  }`}
                >
                  {passo.concluido && <Check className="h-3.5 w-3.5" />}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block font-medium leading-tight ${
                      passo.concluido
                        ? "text-muted-foreground line-through"
                        : ""
                    }`}
                  >
                    <span className="mr-1.5 text-muted-foreground">
                      {indice + 1}.
                    </span>
                    {passo.titulo}
                  </span>

                  {passo.detalhe && (
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                      {passo.detalhe}
                    </span>
                  )}
                </span>
              </label>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Lock className="h-4 w-4 text-muted-foreground" />
          Bloqueados por recurso
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Nada a fazer aqui até o recurso aparecer — não entram na fila acima.
        </p>

        <ul className="mt-4 divide-y divide-border/50">
          {bloqueios.map((bloqueio) => (
            <li
              key={bloqueio.titulo}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2.5"
            >
              <span className="font-medium">{bloqueio.titulo}</span>
              <span className="text-sm text-muted-foreground">
                {bloqueio.motivo}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
