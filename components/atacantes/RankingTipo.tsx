import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { TIPO_LABEL } from "@/constants/typeLabels";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import type {
  AtacanteRanking,
  GolpeAtacante,
  RankingTipo as RankingTipoModel,
} from "@/models/atacante";

/**
 * Quando o nome bate com uma Mega do roster, o sprite vem de
 * data/megas.json de graça (mesmo padrão de EventoReides.tsx). Os demais
 * (formas Sombrosas/Primordiais/Coroadas/Therian e lendários avulsos)
 * ainda não têm sprite curado — caem no fallback de ícone de tipo.
 */
const TITULO_MARCADOR: Record<"*" | "+", string> = {
  "*": "Legado — só via TM Elite (ou em quem já tinha de antes)",
  "+": 'Exclusivo — geralmente uma versão "Plus" do golpe carregado',
};

function resolverImagem(atacante: AtacanteRanking) {
  const mega = MEGAS.find((item) => item.nome === atacante.nome);
  if (mega) return { imagem: mega.imagem, escala: mega.escala };
  return { imagem: atacante.imagem, escala: atacante.escala };
}

/** Legado (*) deixa o nome do golpe em negrito; exclusivo (+) deixa só o
 *  símbolo sobrescrito na cor de destaque do projeto — sinalização visual
 *  rápida, sem precisar ler o marcador. */
function Golpe({ golpe }: { golpe: GolpeAtacante }) {
  return (
    <span className={golpe.marcador === "*" ? "font-semibold text-foreground" : undefined}>
      {golpe.nome}
      {golpe.marcador && (
        <sup
          title={TITULO_MARCADOR[golpe.marcador]}
          className={golpe.marcador === "+" ? "font-semibold text-primary" : undefined}
        >
          {golpe.marcador}
        </sup>
      )}
    </span>
  );
}

type RankingTipoProps = {
  ranking: RankingTipoModel;
};

export function RankingTipo({ ranking }: RankingTipoProps) {
  const { tipo, atacantes } = ranking;
  const slug = tipo.toLowerCase();

  return (
    <div id={slug} className="scroll-mt-[var(--offset-atacantes,5rem)]">
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
                className="grid grid-cols-[1.25rem_2.5rem_1fr] items-center gap-x-3 gap-y-1 py-2.5 sm:grid-cols-[1.25rem_2.5rem_1fr_auto]"
              >
                <span className="text-sm font-semibold text-muted-foreground">
                  {indice + 1}.
                </span>

                {resolvido.imagem ? (
                  <div className="relative h-10 w-10">
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
                  <div className="flex h-10 w-10 items-center justify-center -space-x-1">
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

                <div className="min-w-0">
                  {atacante.nomeEn ? (
                    <Link
                      href={`/?p=${atacante.nomeEn}`}
                      title={`Ver ${atacante.nome} no Pocket`}
                      className="block truncate text-sm font-semibold transition hover:text-primary hover:underline"
                    >
                      {atacante.nome}
                    </Link>
                  ) : (
                    <p className="truncate text-sm font-semibold">{atacante.nome}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    <Golpe golpe={atacante.rapido} />
                    {" → "}
                    <Golpe golpe={atacante.carregado} />
                  </p>
                </div>

                {/* Mobile: chips (Score destacado na cor do projeto) — fácil
                    de bater o olho, já que é a visão mais usada. Desktop
                    mantém o texto empilhado à direita, sem mudanças. */}
                <div className="col-span-3 flex flex-wrap gap-1.5 pl-[calc(1.25rem+2.5rem+0.75rem)] sm:hidden">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    DPS {atacante.dps.toFixed(2)}
                  </span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    TDO {atacante.tdo.toFixed(1)}
                  </span>
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    Score {atacante.score.toFixed(2)}
                  </span>
                </div>

                <div className="col-span-3 hidden flex-col text-[11px] leading-tight text-muted-foreground sm:col-span-1 sm:flex sm:items-end">
                  <span>DPS {atacante.dps.toFixed(2)}</span>
                  <span>TDO {atacante.tdo.toFixed(1)}</span>
                  <span className="font-semibold text-primary">
                    Score {atacante.score.toFixed(2)}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </Card>
    </div>
  );
}
