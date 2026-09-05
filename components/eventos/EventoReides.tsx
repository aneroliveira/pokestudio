import Image from "next/image";
import { Swords } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import { calcularHundosPorNumero } from "@/services/pokemon/statsGO";
import type { ChefeReideEvento, GrupoReideEvento } from "@/models/evento";

type EventoReidesProps = {
  grupos: GrupoReideEvento[];
};

/**
 * Quando o nome bate com uma Mega, a imagem vem de data/megas.json — mas o
 * CP usa as stats BASE da espécie (calcularHundosPorNumero), não as da
 * Mega: numa Mega Raid você captura a forma normal (é ela que evolui pra
 * Mega depois, com Energia), a Mega em si não tem CP de captura próprio.
 * Chefes que não são Mega (ex.: Mewtwo de Armadura) usam o que a curadoria
 * informou manualmente no próprio chefe.
 */
function resolverChefe(chefe: ChefeReideEvento) {
  const mega = MEGAS.find((item) => item.nome === chefe.nome);

  if (mega) {
    const hundos = calcularHundosPorNumero(mega.numeroBase);
    return {
      imagem: mega.imagem,
      escala: mega.escala,
      cpSemClima: hundos?.semClima,
      cpComClima: hundos?.comClima,
    };
  }

  return {
    imagem: chefe.imagem,
    escala: chefe.escala,
    cpSemClima: chefe.cpSemClima,
    cpComClima: chefe.cpComClima,
  };
}

export function EventoReides({ grupos }: EventoReidesProps) {
  return (
    <Card>
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Swords className="h-4 w-4 text-muted-foreground" />
        Reides
      </h2>

      <div className="mt-4 space-y-5">
        {grupos.map((grupo) => (
          <div key={grupo.nivel}>
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {grupo.nivel}
            </span>

            <div className="mt-3 flex flex-wrap gap-3">
              {grupo.chefes.map((chefe) => {
                const resolvido = resolverChefe(chefe);
                const temCp =
                  resolvido.cpSemClima !== undefined &&
                  resolvido.cpComClima !== undefined;

                return (
                  <div
                    key={chefe.nome}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-background/40 p-3 text-center"
                  >
                    {resolvido.imagem ? (
                      <div className="relative h-14 w-14">
                        <Image
                          src={resolvido.imagem}
                          alt={chefe.nome}
                          fill
                          sizes="56px"
                          className="object-contain"
                          style={
                            resolvido.escala
                              ? { transform: `scale(${resolvido.escala})` }
                              : undefined
                          }
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center -space-x-1">
                        {chefe.tipos.map((tipo) => (
                          <TypeIcon
                            key={tipo}
                            tipo={tipo}
                            compact
                            className="bg-secondary ring-2 ring-card"
                          />
                        ))}
                      </div>
                    )}

                    <span className="text-xs font-semibold leading-tight">
                      {chefe.nome}
                    </span>

                    {temCp && (
                      <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-[10px] font-medium text-muted-foreground">
                        <span>☁️ {resolvido.cpSemClima}</span>
                        <span>☀️ {resolvido.cpComClima}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
