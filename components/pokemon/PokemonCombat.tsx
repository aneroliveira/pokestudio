"use client";

import { useState } from "react";
import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";

type PokemonCombatProps = {
  pokemon: Pokemon;
};

type GrupoTiposProps = {
  id: string;
  titulo: string;
  tipos: TipoPokemon[];
  corTitulo: string;
  corChip: string;
  borda?: boolean;
  /** Chave do tipo aberto na seção inteira (só um por vez). */
  aberto: string | null;
  onToggle: (chave: string | null) => void;
};

function GrupoTipos({
  id,
  titulo,
  tipos,
  corTitulo,
  corChip,
  borda = false,
  aberto,
  onToggle,
}: GrupoTiposProps) {
  return (
    <div className={borda ? "border-l border-border pl-4" : undefined}>
      <h3 className={`mb-2 font-medium ${corTitulo}`}>{titulo}</h3>

      {tipos.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tipos.map((tipo) => {
            // Chave por grupo+tipo: o mesmo tipo pode aparecer em grupos
            // diferentes (ataque × defesa) sem abrir os dois juntos.
            const chave = `${id}:${tipo}`;
            return (
              <TypeIcon
                key={tipo}
                tipo={tipo}
                className={corChip}
                aberto={aberto === chave}
                onToggle={() => onToggle(aberto === chave ? null : chave)}
              />
            );
          })}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      )}
    </div>
  );
}

export function PokemonCombat({ pokemon }: PokemonCombatProps) {
  const { fortesContra, fraquezas, resistencias, imunidades } =
    calcularDerivados(pokemon.oficial.tipos);

  // Um nome de tipo aberto por vez em toda a seção de Combate.
  const [aberto, setAberto] = useState<string | null>(null);

  return (
    <SectionCard title="Combate">
      <div className="space-y-5">
        {/* Ataque — contra quem os golpes dele são fortes (foco de raid/ginásio) */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            ⚔️ Atacando
          </p>

          <GrupoTipos
            id="bom"
            titulo="🟢 Bom contra"
            tipos={fortesContra}
            corTitulo="text-good-foreground"
            corChip="bg-good"
            aberto={aberto}
            onToggle={setAberto}
          />
        </div>

        {/* Defesa — dano que ele RECEBE enquanto ataca */}
        <div className="border-t border-border pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            🛡️ Defendendo
          </p>

          <div className="grid grid-cols-2 gap-4">
            <GrupoTipos
              id="fraco"
              titulo="🔴 Fraco a"
              tipos={fraquezas}
              corTitulo="text-bad-foreground"
              corChip="bg-bad"
              aberto={aberto}
              onToggle={setAberto}
            />
            <GrupoTipos
              id="resiste"
              titulo="🟢 Resiste a"
              tipos={[...resistencias, ...imunidades]}
              corTitulo="text-good-foreground"
              corChip="bg-good"
              borda
              aberto={aberto}
              onToggle={setAberto}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
