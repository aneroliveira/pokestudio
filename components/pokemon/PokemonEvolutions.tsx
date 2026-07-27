"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Pokemon, EvolucaoReferencia } from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import { SectionCard } from "@/components/ui/SectionCard";

type PokemonEvolutionsProps = {
  pokemon: Pokemon;
  onSelecionarPokemon?: (item: ItemIndicePokemon) => void;
};

function capitalizar(nome: string): string {
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function EstagioCard({
  estagio,
  onSelecionar,
}: {
  estagio: EvolucaoReferencia;
  onSelecionar?: () => void;
}) {
  const conteudo = (
    <>
      <Image
        src={estagio.imagem}
        alt={capitalizar(estagio.nome)}
        width={56}
        height={56}
      />

      <span className="text-xs font-medium leading-tight">
        {capitalizar(estagio.nome)}
      </span>
    </>
  );

  if (!onSelecionar) {
    return (
      <div className="flex flex-col items-center gap-1 rounded-xl border border-border bg-accent p-3 text-center">
        {conteudo}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelecionar}
      className="flex flex-col items-center gap-1 rounded-xl border border-border bg-accent p-3 text-center transition hover:border-primary hover:bg-accent/70"
    >
      {conteudo}
    </button>
  );
}

function Ramo({
  raiz,
  ehRaizPrincipal,
  onSelecionar,
}: {
  raiz: EvolucaoReferencia;
  ehRaizPrincipal: boolean;
  onSelecionar?: (estagio: EvolucaoReferencia) => void;
}) {
  const sequencia: EvolucaoReferencia[] = [];
  let atual: EvolucaoReferencia | undefined = raiz;

  while (atual && atual.proximas.length === 1) {
    sequencia.push(atual);
    atual = atual.proximas[0];
  }

  if (atual) {
    sequencia.push(atual);
  }

  const ramos = atual?.proximas ?? [];
  const ramosSaoFolhas = ramos.every(
    (ramo) => ramo.proximas.length === 0,
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {sequencia.map((estagio, indice) => {
          const ehCardPrincipal = ehRaizPrincipal && indice === 0;

          return (
            <div key={estagio.nome} className="flex items-center gap-2">
              {indice > 0 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}

              <EstagioCard
                estagio={estagio}
                onSelecionar={
                  ehCardPrincipal || !onSelecionar
                    ? undefined
                    : () => onSelecionar(estagio)
                }
              />
            </div>
          );
        })}
      </div>

      {ramos.length > 0 && (
        <div
          className={
            ramosSaoFolhas
              ? "ml-4 mt-2 flex flex-wrap gap-2 border-l-2 border-border pl-4"
              : "ml-4 mt-3 space-y-3 border-l-2 border-border pl-4"
          }
        >
          {ramosSaoFolhas
            ? ramos.map((ramo) => (
                <EstagioCard
                  key={ramo.nome}
                  estagio={ramo}
                  onSelecionar={
                    onSelecionar
                      ? () => onSelecionar(ramo)
                      : undefined
                  }
                />
              ))
            : ramos.map((ramo) => (
                <Ramo
                  key={ramo.nome}
                  raiz={ramo}
                  ehRaizPrincipal={false}
                  onSelecionar={onSelecionar}
                />
              ))}
        </div>
      )}
    </div>
  );
}

export function PokemonEvolutions({
  pokemon,
  onSelecionarPokemon,
}: PokemonEvolutionsProps) {
  const atual: EvolucaoReferencia = {
    nome:
      pokemon.oficial.nome.ptBR ||
      pokemon.oficial.nome.enUS ||
      pokemon.oficial.numero,
    numero: pokemon.oficial.numero,
    imagem: pokemon.oficial.imagem,
    proximas: pokemon.oficial.evolucao.proximas,
  };

  if (atual.proximas.length === 0) {
    return null;
  }

  return (
    <SectionCard title="Evoluções">
      <Ramo
        raiz={atual}
        ehRaizPrincipal
        onSelecionar={
          onSelecionarPokemon
            ? (estagio) =>
                onSelecionarPokemon({
                  id: 0,
                  numero: estagio.numero,
                  nomeEn: estagio.nome,
                })
            : undefined
        }
      />
    </SectionCard>
  );
}
