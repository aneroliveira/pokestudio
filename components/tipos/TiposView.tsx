"use client";

import { useState } from "react";
import { ArrowRight, Shield, Swords } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { cn } from "@/lib/utils";
import type { TipoPokemon } from "@/models/pokemon";
import { TIPO_LABEL } from "@/constants/typeLabels";
import { RELACOES_DEFENSIVAS } from "@/constants/typeChart";
import { RELACOES_OFENSIVAS } from "@/services/pokemon/efetividade";

const TIPOS = Object.keys(RELACOES_DEFENSIVAS) as TipoPokemon[];

type Alvo = { tipo: TipoPokemon; dupla?: boolean };

/** Uma linha "tipo escolhido → tipos". O escolhido fica fixo à esquerda e
 *  os alvos quebram linha só na coluna da direita, nunca embaixo dele.
 *  `dupla` marca o 0,39× do GO — o que na série principal seria imune. */
function LinhaRelacao({
  rotulo,
  tipo,
  alvos,
}: {
  rotulo: string;
  tipo: TipoPokemon;
  alvos: Alvo[];
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-medium text-muted-foreground">{rotulo}</p>

      <div className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-start gap-2">
        <TypeIcon tipo={tipo} compact mostrarNome className="bg-secondary" />
        <ArrowRight className="mt-1.5 h-4 w-4 text-muted-foreground" aria-hidden />

        {alvos.length === 0 ? (
          <span className="pt-1 text-sm text-muted-foreground">Nenhum</span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {alvos.map(({ tipo: alvo, dupla }) => (
              <span
                key={alvo}
                className="inline-flex items-center gap-1 rounded-full bg-secondary/60 pr-1"
              >
                <TypeIcon tipo={alvo} compact mostrarNome className="bg-secondary" />
                {dupla && (
                  <span
                    title="No GO não existe imunidade: vira 0,39× (dupla resistência)"
                    className="rounded-full bg-background/70 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground"
                  >
                    0,39×
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Aba "Tipos" da Home: escolhe um tipo e vê, sem precisar de um Pokémon,
 * contra o que ele é forte e fraco atacando (Ataque) e o que ele resiste e
 * do que apanha defendendo (Defesa). Multiplicadores do GO: 1,6× super
 * efetivo, 0,625× pouco efetivo e 0,39× no lugar da imunidade.
 */
export function TiposView() {
  const [tipo, setTipo] = useState<TipoPokemon>(TIPOS[0]);

  const ofensivas = RELACOES_OFENSIVAS[tipo];
  const defensivas = RELACOES_DEFENSIVAS[tipo];

  return (
    <div className="space-y-6">
      <div role="group" aria-label="Escolher tipo" className="flex flex-wrap gap-2">
        {TIPOS.map((item) => {
          const ativo = item === tipo;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setTipo(item)}
              aria-pressed={ativo}
              title={TIPO_LABEL[item]}
              className={cn(
                "rounded-full border p-0.5 transition",
                ativo
                  ? "border-primary bg-primary/15 ring-1 ring-primary/40"
                  : "border-border hover:border-primary/40",
              )}
            >
              <TypeIcon tipo={item} compact mostrarNome className="bg-secondary" />
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Swords className="h-4 w-4 text-muted-foreground" aria-hidden />
            Ataque
          </h2>
          <LinhaRelacao
            rotulo="Forte contra (1,6×)"
            tipo={tipo}
            alvos={ofensivas.superEfetivo.map((alvo) => ({ tipo: alvo }))}
          />
          <LinhaRelacao
            rotulo="Fraco contra (0,625×)"
            tipo={tipo}
            alvos={[
              ...ofensivas.poucoEfetivo.map((alvo) => ({ tipo: alvo })),
              ...ofensivas.semEfeito.map((alvo) => ({ tipo: alvo, dupla: true })),
            ]}
          />
        </Card>

        <Card className="space-y-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-4 w-4 text-muted-foreground" aria-hidden />
            Defesa
          </h2>
          <LinhaRelacao
            rotulo="Resiste a (leva 0,625×)"
            tipo={tipo}
            alvos={[
              ...defensivas.half_damage_from.map((alvo) => ({ tipo: alvo })),
              ...defensivas.no_damage_from.map((alvo) => ({ tipo: alvo, dupla: true })),
            ]}
          />
          <LinhaRelacao
            rotulo="Fraco a (leva 1,6×)"
            tipo={tipo}
            alvos={defensivas.double_damage_from.map((alvo) => ({ tipo: alvo }))}
          />
        </Card>
      </div>
    </div>
  );
}
