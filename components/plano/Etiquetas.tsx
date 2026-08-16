import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { EtiquetaChip } from "@/components/plano/EtiquetaChip";
import type { CounterChefe, Plano } from "@/models/plano";

type EtiquetasProps = {
  etiquetas: Plano["etiquetas"];
  countersPorChefe: CounterChefe[];
};

export function Etiquetas({ etiquetas, countersPorChefe }: EtiquetasProps) {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Etiquetas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Padrão:{" "}
          <code className="rounded bg-secondary px-1 py-0.5 font-mono text-xs">
            {etiquetas.prefixo}
          </code>{" "}
          sem acentos. O ponto delas é nunca mais rolar a lista inteira de
          Pokémon na hora da reide.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {etiquetas.lista.map((etiqueta) => (
            <EtiquetaChip key={etiqueta} etiqueta={etiqueta} />
          ))}
        </div>

        <p className="mt-4 text-sm text-foreground/90">{etiquetas.excecao}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {etiquetas.conferencia}
        </p>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Como usar na hora da reide</h2>

        <ol className="mt-4 space-y-4">
          {etiquetas.comoUsar.map((passo, indice) => (
            <li key={passo.titulo} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                {indice + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className="font-medium leading-tight">{passo.titulo}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {passo.corpo}
                </p>

                {passo.exemplo && (
                  <pre className="mt-2 overflow-x-auto rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground">
                    {passo.exemplo}
                  </pre>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Tabela rápida — chefe → etiqueta</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Viu o tipo do chefe, digite a etiqueta correspondente na lupa.
        </p>

        <ul className="mt-4 divide-y divide-border/50">
          {countersPorChefe.map((counter) => (
            <li
              key={counter.tipoChefe}
              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <div className="sm:w-32 sm:shrink-0">
                <TypeIcon
                  tipo={counter.tipoChefe}
                  className="bg-secondary"
                  compact
                  mostrarNome
                />
              </div>

              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                {counter.usar.map((alvo) => (
                  <span key={alvo.tipo} className="inline-flex items-center">
                    {alvo.etiqueta ? (
                      <EtiquetaChip etiqueta={alvo.etiqueta} />
                    ) : (
                      <TypeIcon
                        tipo={alvo.tipo}
                        className="bg-secondary"
                        compact
                        mostrarNome
                      />
                    )}
                    {alvo.nota && (
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({alvo.nota})
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Manutenção</h2>

        <ul className="mt-3 space-y-2 text-sm leading-relaxed text-foreground/90">
          {etiquetas.manutencao.map((item) => (
            <li key={item} className="flex gap-2">
              <span aria-hidden className="text-muted-foreground">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
