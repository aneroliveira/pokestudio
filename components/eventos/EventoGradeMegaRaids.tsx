"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import { calcularHundosPorNumero } from "@/services/pokemon/statsGO";
import type { DiaGradeMega } from "@/models/evento";

type EventoGradeMegaRaidsProps = {
  titulo: string;
  dias: DiaGradeMega[];
};

/**
 * Grade de Mega Raids por horário, separada por dia em abas — imagem vem
 * de data/megas.json (RFC-002), mas o CP usa as stats BASE da espécie
 * (calcularHundosPorNumero), não as da Mega: numa Mega Raid você captura a
 * forma normal (é ela que evolui pra Mega depois, com Energia), a Mega em
 * si não tem CP de captura próprio. Só o nome do chefe e o horário são
 * curados aqui.
 */
export function EventoGradeMegaRaids({ titulo, dias }: EventoGradeMegaRaidsProps) {
  const rotulos = dias.map((dia) => dia.rotulo);
  const [ativa, setAtiva] = useState(rotulos[0]);

  const diaAtivo = dias.find((dia) => dia.rotulo === ativa) ?? dias[0];

  return (
    <Card>
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Clock className="h-4 w-4 text-muted-foreground" />
        {titulo}
      </h2>

      <div className="mt-4">
        <Tabs abas={rotulos} ativa={ativa} onChange={setAtiva} />
      </div>

      <div className="mt-4 space-y-6">
        {diaAtivo.grupos.map((grupo) => (
          <div key={grupo.horario}>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/15 px-2.5 py-1 text-sm font-bold text-primary">
                🕒 {grupo.horario}
              </span>
              {grupo.habitat && (
                <span className="text-xs text-muted-foreground">{grupo.habitat}</span>
              )}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {grupo.megas.map((nomeMega) => {
                const mega = MEGAS.find((item) => item.nome === nomeMega);
                if (!mega) return null;

                const hundos = calcularHundosPorNumero(mega.numeroBase);

                return (
                  <div
                    key={mega.id}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-background/40 p-3 text-center"
                  >
                    <div className="relative h-14 w-14">
                      {mega.imagem && (
                        <Image
                          src={mega.imagem}
                          alt={mega.nome}
                          fill
                          sizes="56px"
                          className="object-contain"
                          style={
                            mega.escala
                              ? { transform: `scale(${mega.escala})` }
                              : undefined
                          }
                        />
                      )}
                    </div>

                    <span className="text-xs font-semibold leading-tight">
                      {mega.nome}
                    </span>

                    {hundos && (
                      <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-[10px] font-medium text-muted-foreground">
                        <span>☁️ {hundos.semClima}</span>
                        <span>☀️ {hundos.comClima}</span>
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
