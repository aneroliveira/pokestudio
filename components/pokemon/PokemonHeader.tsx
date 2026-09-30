"use client";

import type { Pokemon } from "@/models/pokemon";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { InfoTip } from "@/components/ui/InfoTip";
import { useFormasVisuais } from "@/components/pokemon/useFormasVisuais";
import { BotaoForma } from "@/components/pokemon/BotaoForma";
import Image from "next/image";

type PokemonHeaderProps = {
  pokemon: Pokemon;
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  const {
    mostrarShiny,
    alternarShiny,
    mostrarMega,
    alternarMega,
    mostrarGigamax,
    alternarGigamax,
    temShiny,
    temMega,
    temGigamax,
    imagensExibidas,
  } = useFormasVisuais(pokemon);

  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">
          {pokemon.oficial.numero || "#000"}
        </p>

        <h2 className="text-3xl font-bold">
          {pokemon.oficial.nome.ptBR || "Pokémon"}
        </h2>

        {/* Chips de forma numa linha só deles, sem quebrar — ao lado do nome
            eles pulavam de linha quando duas Megas (X/Y) estreitavam a
            coluna. Mesma ideia da ficha rápida: os chips não cedem espaço. */}
        <div className="mt-2 flex flex-nowrap items-center gap-2 empty:hidden">
          {temShiny && (
            <BotaoForma
              forma="shiny"
              ativo={mostrarShiny}
              onClick={alternarShiny}
            />
          )}

          {temMega && (
            <BotaoForma forma="mega" ativo={mostrarMega} onClick={alternarMega} />
          )}

          {temGigamax && (
            <BotaoForma
              forma="gigamax"
              ativo={mostrarGigamax}
              onClick={alternarGigamax}
            />
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.oficial.tipos.length > 0 ? (
            pokemon.oficial.tipos.map((tipo) => (
              <TypeIcon
                key={tipo}
                tipo={tipo}
                className="bg-secondary"
                compact
              />
            ))
          ) : (
            <span className="text-sm text-muted-foreground">
              Sem tipos
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1.5">
          <PriorityBadge value={pokemon.studio.estrategia.tier} />
          <InfoTip
            texto="Tier é a nota de prioridade que o PokéStudio dá ao Pokémon — quanto mais alto, mais vale a pena investir nele. É curadoria própria do app, não uma métrica oficial do jogo."
            topico="tier"
          />
        </div>
      </div>

      {/* No celular, duas imagens lado a lado (Megas X/Y) espremiam o nome
          por cima delas — limitando a largura a uma imagem, elas empilham. */}
      <div className="flex max-w-[104px] shrink-0 flex-wrap items-start justify-end gap-4 sm:max-w-none">
        {imagensExibidas.map((imagem) => (
          <div key={imagem.key} className="flex flex-col items-center gap-1">
            {imagem.src ? (
              <div className="relative h-[104px] w-[104px]">
                <Image
                  src={imagem.src}
                  alt={imagem.alt}
                  fill
                  sizes="104px"
                  className="object-contain"
                  style={
                    imagem.escala ? { transform: `scale(${imagem.escala})` } : undefined
                  }
                />
              </div>
            ) : (
              <div className="flex h-[104px] w-[104px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted text-center text-xs text-muted-foreground">
                Sem imagem
              </div>
            )}

            {imagem.legenda && (
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {imagem.legenda}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
