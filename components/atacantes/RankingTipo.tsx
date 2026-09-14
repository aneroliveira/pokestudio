import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { TIPO_LABEL } from "@/constants/typeLabels";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import type { AtacanteRanking, RankingTipo as RankingTipoModel } from "@/models/atacante";

/**
 * Quando o nome bate com uma Mega do roster, o sprite vem de
 * data/megas.json de graça (mesmo padrão de EventoReides.tsx). Os demais
 * (formas Sombrosas/Primordiais/Coroadas/Therian e lendários avulsos)
 * ainda não têm sprite curado — caem no fallback de ícone de tipo.
 */
function resolverImagem(atacante: AtacanteRanking) {
  const mega = MEGAS.find((item) => item.nome === atacante.nome);
  if (mega) return { imagem: mega.imagem, escala: mega.escala };
  return { imagem: atacante.imagem, escala: atacante.escala };
}

type RankingTipoProps = {
  ranking: RankingTipoModel;
};

export function RankingTipo({ ranking }: RankingTipoProps) {
  const { tipo, atacantes } = ranking;
  const slug = tipo.toLowerCase();

  return (
    <div id={slug} className="scroll-mt-20">
      <Card>
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <TypeIcon tipo={tipo} compact />
          Top 5 — {TIPO_LABEL[tipo]}
        </h2>

        <ol className="mt-4 divide-y divide-border/50">
          {atacantes.map((atacante, indice) => {
            const resolvido = resolverImagem(atacante);

            return (
              <li
                key={`${atacante.nome}-${indice}`}
                className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-2.5"
              >
                <span className="w-5 shrink-0 text-sm font-semibold text-muted-foreground">
                  {indice + 1}.
                </span>

                {resolvido.imagem ? (
                  <div className="relative h-10 w-10 shrink-0">
                    <Image
                      src={resolvido.imagem}
                      alt={atacante.nome}
                      fill
                      sizes="40px"
                      className="object-contain"
                      style={
                        resolvido.escala
                          ? { transform: `scale(${resolvido.escala})` }
                          : undefined
                      }
                    />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center -space-x-1">
                    {atacante.tipos.map((t) => (
                      <TypeIcon
                        key={t}
                        tipo={t}
                        compact
                        className="bg-secondary ring-2 ring-card"
                      />
                    ))}
                  </div>
                )}

                <div className="min-w-0 flex-1 basis-32">
                  <p className="truncate text-sm font-semibold">{atacante.nome}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {atacante.rapido.nome}
                    {atacante.rapido.marcador && (
                      <sup title="Golpe exclusivo ou legado">
                        {atacante.rapido.marcador}
                      </sup>
                    )}
                    {" → "}
                    {atacante.carregado.nome}
                    {atacante.carregado.marcador && (
                      <sup title="Golpe exclusivo ou legado">
                        {atacante.carregado.marcador}
                      </sup>
                    )}
                  </p>
                </div>

                <div className="shrink-0 text-right text-[11px] leading-tight text-muted-foreground">
                  <div>
                    DPS {atacante.dps.toFixed(2)} · TDO {atacante.tdo.toFixed(1)}
                  </div>
                  <div className="font-semibold text-primary">
                    Score {atacante.score.toFixed(2)}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
