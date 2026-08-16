import { Card } from "@/components/ui/Card";
import type { Plano } from "@/models/plano";

type AprendizadosProps = {
  armadilhas: Plano["armadilhas"];
  glossario: Plano["glossario"];
  buscas: Plano["buscas"];
  diagnostico: string;
};

export function Aprendizados({
  armadilhas,
  glossario,
  buscas,
  diagnostico,
}: AprendizadosProps) {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">Armadilhas aprendidas</h2>

        <div className="mt-4 space-y-4">
          {armadilhas.licoes.map((licao) => (
            <div key={licao.titulo}>
              <p className="font-medium leading-tight">{licao.titulo}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                {licao.corpo}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 overflow-x-auto border-t border-border/50 pt-4">
          <table className="w-full min-w-[30rem] text-left text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2 pr-3 font-medium">Pokémon</th>
                <th className="pb-2 pr-3 font-medium">Parece</th>
                <th className="pb-2 pr-3 font-medium">É</th>
                <th className="pb-2 font-medium">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {armadilhas.tiposEnganosos.map((caso) => (
                <tr key={caso.pokemon}>
                  <td className="py-2 pr-3 font-medium">{caso.pokemon}</td>
                  <td className="py-2 pr-3 text-muted-foreground line-through">
                    {caso.parece}
                  </td>
                  <td className="py-2 pr-3 font-medium">{caso.ehNaVerdade}</td>
                  <td className="py-2 text-muted-foreground">{caso.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Buscas</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sintaxe da lupa dentro do Pokémon GO.
        </p>

        <ul className="mt-4 space-y-3">
          {buscas.map((busca) => (
            <li key={busca.sintaxe}>
              <pre className="overflow-x-auto rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground">
                {busca.sintaxe}
              </pre>
              <p className="mt-1 text-sm text-muted-foreground">
                {busca.descricao}
              </p>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Nomes PT-BR que confundem</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          O jogo está em português, mas quase todo guia de meta está em inglês.
        </p>

        <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {glossario.map((termo) => (
            <div
              key={termo.ptbr}
              className="flex items-baseline justify-between gap-3 border-b border-border/50 pb-1.5"
            >
              <dt className="font-medium">{termo.ptbr}</dt>
              <dd className="shrink-0 text-sm text-muted-foreground">
                {termo.en}
              </dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Diagnóstico original</h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {diagnostico}
        </p>
      </Card>
    </div>
  );
}
