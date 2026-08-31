"use client";

import type { Pokemon } from "@/models/pokemon";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { ToggleChip } from "@/components/ui/ToggleChip";
import { useMegaShiny } from "@/components/pokemon/useMegaShiny";
import Image from "next/image";

type PokemonHeaderProps = {
  pokemon: Pokemon;
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  const {
    mostrarShiny,
    setMostrarShiny,
    mostrarMega,
    setMostrarMega,
    temShiny,
    temMega,
    imagensExibidas,
  } = useMegaShiny(pokemon);

  return (
    <div className="flex items-start justify-between gap-6">
      <div className="min-w-0 flex-1">
        <p className="text-sm text-muted-foreground">
          {pokemon.oficial.numero || "#000"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-3xl font-bold">
            {pokemon.oficial.nome.ptBR || "Pokémon"}
          </h2>

          {temShiny && (
            <ToggleChip
              ativo={mostrarShiny}
              onClick={() => setMostrarShiny((valor) => !valor)}
            >
              ✨ Shiny
            </ToggleChip>
          )}

          {temMega && (
            <ToggleChip
              ativo={mostrarMega}
              onClick={() => setMostrarMega((valor) => !valor)}
            >
              💠 Mega
            </ToggleChip>
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

        <div className="mt-3">
          <PriorityBadge value={pokemon.studio.estrategia.tier} />
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-start justify-end gap-4">
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
