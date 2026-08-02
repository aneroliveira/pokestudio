"use client";

import { useEffect, useRef, useState } from "react";
import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { Input } from "@/components/ui/input";
import {
  calcularCacadaPorNumero,
  calcularCPPorNivelPorNumero,
  FAIXAS_IV_CACADA,
  TETO_NIVEL_SELVAGEM,
  TETO_NIVEL_SELVAGEM_CLIMA,
  type FaixaIVCacada,
} from "@/services/pokemon/statsGO";

const ABAS = ["Caçada", "Resumo"] as const;
type Aba = (typeof ABAS)[number];

type PokemonHundosProps = {
  pokemon: Pokemon;
};

export function PokemonHundos({ pokemon }: PokemonHundosProps) {
  const [aba, setAba] = useState<Aba>("Caçada");
  const [faixasAtivas, setFaixasAtivas] = useState<
    Record<FaixaIVCacada, boolean>
  >({ "100%": false, "98%": false, "96%": false });
  const [filtroClima, setFiltroClima] = useState(false);
  const [pcBuscado, setPcBuscado] = useState("");

  const porNivel = calcularCPPorNivelPorNumero(pokemon.oficial.numero);
  const cacada = calcularCacadaPorNumero(
    pokemon.oficial.numero,
    filtroClima ? TETO_NIVEL_SELVAGEM_CLIMA : TETO_NIVEL_SELVAGEM,
  );
  const faixasSelecionadas = FAIXAS_IV_CACADA.filter(
    (faixa) => faixasAtivas[faixa.label],
  );

  const cpAlvoTexto = pcBuscado.trim();
  const cpAlvo = cpAlvoTexto === "" ? undefined : Number(cpAlvoTexto);
  const buscaValida = cpAlvo !== undefined && !Number.isNaN(cpAlvo);

  // A busca por PC checa as três faixas sempre, independente dos chips
  // marcados — os chips só controlam o que a lista abaixo exibe.
  const resultadosBusca = buscaValida
    ? (cacada ?? []).flatMap(({ nivel, cps }) =>
        FAIXAS_IV_CACADA.filter((faixa) => cps[faixa.label] === cpAlvo).map(
          (faixa) => ({ nivel, faixa: faixa.label }),
        ),
      )
    : [];
  const primeiroNivelEncontrado = resultadosBusca[0]?.nivel;

  const linhaEncontradaRef = useRef<HTMLDivElement>(null);

  // Leva a linha encontrada até a tela em vez de deixar a jogadora rolar a
  // lista procurando onde o PC bate — esse é o ponto todo da busca.
  useEffect(() => {
    if (primeiroNivelEncontrado !== undefined) {
      linhaEncontradaRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  }, [primeiroNivelEncontrado]);

  // Sem base stats na fonte (Megas, formas alternativas) não há como montar
  // nenhuma das duas abas — nesse caso o card mostra só o aviso abaixo.
  if (!porNivel) {
    return (
      <SectionCard title="Hundos">
        <p className="text-sm text-muted-foreground">
          Sem base stats do GO para esta forma.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Hundos">
      <div className="mb-4 inline-flex rounded-lg bg-muted p-0.5">
        {ABAS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setAba(item)}
            aria-pressed={aba === item}
            className={`rounded-md px-3 py-1 text-xs font-medium transition ${
              aba === item
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {aba === "Resumo" ? (
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
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {FAIXAS_IV_CACADA.map((faixa) => {
              const ativa = faixasAtivas[faixa.label];
              return (
                <button
                  key={faixa.label}
                  type="button"
                  onClick={() =>
                    setFaixasAtivas((atual) => ({
                      ...atual,
                      [faixa.label]: !atual[faixa.label],
                    }))
                  }
                  aria-pressed={ativa}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    ativa
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {faixa.label}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setFiltroClima((atual) => !atual)}
              aria-pressed={filtroClima}
              className={`ml-auto rounded-full border px-3 py-1 text-xs font-medium transition ${
                filtroClima
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {filtroClima ? "☀️ Com clima" : "Sem clima"}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="cacada-pc"
              className="text-xs font-medium text-muted-foreground"
            >
              PC/CP que você pegou
            </label>
            <Input
              id="cacada-pc"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={pcBuscado}
              onChange={(event) =>
                setPcBuscado(event.target.value.replace(/\D/g, "").slice(0, 4))
              }
              placeholder="0000"
              className="h-8 w-20"
            />
          </div>

          {buscaValida &&
            (resultadosBusca.length > 0 ? (
              <p className="text-sm">
                PC {cpAlvo} →{" "}
                <strong className="text-foreground">
                  {resultadosBusca
                    .map((r) => `Nível ${r.nivel} · ${r.faixa}`)
                    .join(" · ")}
                </strong>
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma combinação pra PC {cpAlvo} nesses filtros.
              </p>
            ))}

          {faixasSelecionadas.length > 0 && (
            <div>
              <div
                className="grid gap-2 border-b border-border pb-1.5 text-xs font-semibold text-muted-foreground"
                style={{
                  gridTemplateColumns: `2.5rem repeat(${faixasSelecionadas.length}, 1fr)`,
                }}
              >
                <span>Nível</span>
                {faixasSelecionadas.map((faixa) => (
                  <span key={faixa.label} className="text-right">
                    {faixa.label}
                  </span>
                ))}
              </div>

              <div className="max-h-72 overflow-y-auto pr-1">
                {cacada?.map(({ nivel, cps }) => {
                  const destacado = resultadosBusca.some(
                    (r) => r.nivel === nivel,
                  );

                  return (
                    <div
                      key={nivel}
                      ref={
                        nivel === primeiroNivelEncontrado
                          ? linhaEncontradaRef
                          : undefined
                      }
                      className={`grid items-center gap-2 border-b border-border/50 py-1.5 last:border-b-0 ${
                        destacado ? "bg-primary/10" : ""
                      }`}
                      style={{
                        gridTemplateColumns: `2.5rem repeat(${faixasSelecionadas.length}, 1fr)`,
                      }}
                    >
                      <span className="text-sm text-muted-foreground">
                        {nivel}
                      </span>

                      {faixasSelecionadas.map((faixa) => (
                        <strong
                          key={faixa.label}
                          className="text-right text-sm font-bold text-foreground"
                        >
                          {cps[faixa.label]}
                        </strong>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            🧮 CP por nível, teto selvagem{" "}
            {filtroClima ? TETO_NIVEL_SELVAGEM_CLIMA : TETO_NIVEL_SELVAGEM}.
          </p>
        </div>
      )}
    </SectionCard>
  );
}
