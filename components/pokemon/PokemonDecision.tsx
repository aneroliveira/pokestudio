"use client";

import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { RecommendationChip } from "@/components/ui/RecommendationChip";

type PokemonDecisionProps = {
  pokemon: Pokemon;
};

function formatarTitulo(titulo: string): string {
  const limpo = titulo.replace("Vale ", "").trim();
  return limpo.charAt(0).toUpperCase() + limpo.slice(1);
}

export function PokemonDecision({ pokemon }: PokemonDecisionProps) {
  const { decisoes } = pokemon.studio.conhecimento;
  // Uma decisão aberta por vez (acordeão). Guarda o título da aberta.
  const [aberta, setAberta] = useState<string | null>(null);

  if (decisoes.length === 0) {
    return null;
  }

  const decisaoAberta = decisoes.find(
    (d) => d.titulo === aberta && d.motivo,
  );

  return (
    <SectionCard title="">
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          {decisoes.map((decisao) => {
            const temMotivo = Boolean(decisao.motivo);

            return (
              <RecommendationChip
                key={decisao.titulo}
                status={decisao.status}
                label={formatarTitulo(decisao.titulo)}
                selecionado={aberta === decisao.titulo}
                onClick={
                  temMotivo
                    ? () =>
                        setAberta((atual) =>
                          atual === decisao.titulo ? null : decisao.titulo,
                        )
                    : undefined
                }
              />
            );
          })}
        </div>

        {decisaoAberta && (
          <div className="rounded-xl border border-border bg-accent px-4 py-3 text-sm leading-relaxed">
            <span className="font-semibold">
              {formatarTitulo(decisaoAberta.titulo)}:
            </span>{" "}
            {decisaoAberta.motivo}
          </div>
        )}
      </div>
    </SectionCard>
  );
}
