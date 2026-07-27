"use client";

import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";
import { PriorityBadge } from "@/components/ui/PriorityBadge";
import { TypeIcon } from "@/components/ui/TypeIcon";
import Image from "next/image";

type PokemonHeaderProps = {
  pokemon: Pokemon;
};

export function PokemonHeader({ pokemon }: PokemonHeaderProps) {
  const [mostrarShiny, setMostrarShiny] = useState(false);

  const temShiny = Boolean(pokemon.oficial.imagemShiny);
  const imagemExibida =
    mostrarShiny && temShiny
      ? pokemon.oficial.imagemShiny
      : pokemon.oficial.imagem;

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
            <button
              type="button"
              onClick={() => setMostrarShiny((valor) => !valor)}
              aria-pressed={mostrarShiny}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                mostrarShiny
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              ✨ Shiny
            </button>
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

      <div className="flex shrink-0 flex-col items-center gap-2">
        {imagemExibida ? (
          <div className="relative h-[104px] w-[104px]">
            <Image
              src={imagemExibida}
              alt={pokemon.oficial.nome.ptBR || "Pokémon"}
              fill
              sizes="104px"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex h-[104px] w-[104px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted text-center text-xs text-muted-foreground">
            Sem imagem
          </div>
        )}
      </div>
    </div>
  )
}