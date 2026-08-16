import { Card } from "@/components/ui/Card";
import { ExemplarRow } from "@/components/plano/ExemplarRow";
import type { BlocoPlano } from "@/models/plano";

type BlocoCardProps = {
  bloco: BlocoPlano;
};

export function BlocoCard({ bloco }: BlocoCardProps) {
  const { titulo, resumo, concluido, exemplares, notas, subsecoes, movesets } =
    bloco;

  return (
    <Card>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold">{titulo}</h2>

        {concluido && (
          <span className="rounded-full bg-good px-2.5 py-0.5 text-xs font-semibold text-good-foreground">
            Concluído
          </span>
        )}
      </div>

      {resumo && (
        <p className="mt-1 text-sm text-muted-foreground">{resumo}</p>
      )}

      <div className="mt-4 divide-y divide-border/50">
        {exemplares.map((exemplar, indice) => (
          <ExemplarRow
            // A mesma espécie aparece mais de uma vez no bloco em papéis
            // diferentes (Mewtwo X e Y), então o número não serve de chave.
            key={`${exemplar.numero}-${exemplar.nome}-${indice}`}
            exemplar={exemplar}
          />
        ))}
      </div>

      {notas && notas.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-border/50 pt-4 text-sm leading-relaxed text-foreground/90">
          {notas.map((nota) => (
            <li key={nota} className="flex gap-2">
              <span aria-hidden className="text-muted-foreground">
                •
              </span>
              <span>{nota}</span>
            </li>
          ))}
        </ul>
      )}

      {movesets && movesets.length > 0 && (
        <section className="mt-6 border-t border-border/50 pt-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Movesets-alvo
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[26rem] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="pb-2 pr-3 font-medium">Pokémon</th>
                  <th className="pb-2 pr-3 font-medium">Rápido</th>
                  <th className="pb-2 font-medium">Carregado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {movesets.map((moveset) => (
                  <tr key={moveset.pokemon}>
                    <td className="py-2 pr-3 font-medium">{moveset.pokemon}</td>
                    <td className="py-2 pr-3 text-muted-foreground">
                      {moveset.rapido}
                    </td>
                    <td className="py-2">
                      {moveset.carregado}
                      {moveset.observacao && (
                        <span className="mt-0.5 block text-xs text-muted-foreground">
                          {moveset.observacao}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {subsecoes?.map((subsecao) => (
        <section
          key={subsecao.titulo}
          className="mt-6 border-t border-border/50 pt-4"
        >
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {subsecao.titulo}
          </h3>

          <ul className="space-y-1.5 text-sm leading-relaxed text-foreground/90">
            {subsecao.itens.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="text-muted-foreground">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </Card>
  );
}
