"use client";

import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { InfoRow } from "@/components/ui/InfoRow";
import {
  calcularCPPorNivelPorNumero,
  calcularHundosPorNumero,
} from "@/services/pokemon/statsGO";

const ABAS = ["Resumo", "Por nível"] as const;
type Aba = (typeof ABAS)[number];

type PokemonHundosProps = {
  pokemon: Pokemon;
};

export function PokemonHundos({ pokemon }: PokemonHundosProps) {
  const [aba, setAba] = useState<Aba>("Resumo");

  const calculado = calcularHundosPorNumero(pokemon.oficial.numero);
  const porNivel = calcularCPPorNivelPorNumero(pokemon.oficial.numero);
  const { hundos, quaseHundos } = pokemon.studio.go;

  const semClima = hundos.semClima || calculado?.semClima;
  const comClima = hundos.comClima || calculado?.comClima;
  const iv98 = quaseHundos.iv98 || calculado?.quaseHundos.iv98;
  const iv96 = quaseHundos.iv96 || calculado?.quaseHundos.iv96;

  const usandoCalculado =
    !!calculado &&
    !hundos.semClima &&
    !hundos.comClima &&
    !quaseHundos.iv98 &&
    !quaseHundos.iv96;

  // Sem base stats na fonte (Megas, formas alternativas) não há como montar
  // a lista por nível — nesse caso a aba não aparece.
  const abaAtiva: Aba = porNivel ? aba : "Resumo";

  // Nem base stats na fonte, nem override salvo: sem isso os títulos das
  // faixas ficariam pendurados sem nenhum valor embaixo.
  const semDados = !semClima && !comClima && !iv98 && !iv96;

  if (semDados) {
    return (
      <SectionCard title="Hundos">
        <p className="text-sm text-muted-foreground">
          Sem base stats do GO para esta forma — preencha os CPs manualmente
          na aba GO do Admin.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Hundos">
      {porNivel && (
        <div className="mb-4 inline-flex rounded-lg bg-muted p-0.5">
          {ABAS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setAba(item)}
              aria-pressed={abaAtiva === item}
              className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                abaAtiva === item
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {abaAtiva === "Resumo" ? (
        <div className="space-y-2">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            100%
          </h3>

          {semClima && (
            <InfoRow
              label="Sem clima"
              hint="Nível 20 · Raid e Ovo"
              value={semClima}
            />
          )}

          {comClima && (
            <InfoRow
              label="Com clima"
              hint="Nível 25 · Clima favorável"
              value={comClima}
            />
          )}

          <hr className="my-3 border-border" />

          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Quase Hundos
          </h3>

          {iv98 && <InfoRow label="98%" hint="15/15/14" value={iv98} />}

          {iv96 && <InfoRow label="96%" hint="15/14/14" value={iv96} />}

          {usandoCalculado && (
            <p className="text-xs text-muted-foreground">
              🧮 Estimado a partir das base stats do GO.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            CP máximo por nível
          </h3>

          {porNivel?.map(({ nivel, contexto, cp }) => (
            <InfoRow
              key={nivel}
              label={`Nível ${nivel}`}
              hint={contexto}
              value={cp}
            />
          ))}

          <p className="text-xs text-muted-foreground">
            🧮 CP de um 100% (15/15/15) em cada nível.
          </p>
        </div>
      )}
    </SectionCard>
  );
}
