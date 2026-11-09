"use client";

import { useState } from "react";
import Image from "next/image";
import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { cn } from "@/lib/utils";
import {
  obterFormasCombate,
  type FormaCombate,
} from "@/services/pokemon/formasCombate";
import { SectionCard } from "@/components/ui/SectionCard";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { InfoTip } from "@/components/ui/InfoTip";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";

type PokemonCombatProps = {
  pokemon: Pokemon;
};

type GrupoTiposProps = {
  titulo: string;
  tipos: TipoPokemon[];
  corTitulo: string;
  corChip: string;
  borda?: boolean;
};

function GrupoTipos({
  titulo,
  tipos,
  corTitulo,
  corChip,
  borda = false,
}: GrupoTiposProps) {
  return (
    <div className={borda ? "border-l border-border pl-4" : undefined}>
      <h3 className={`mb-2 font-medium ${corTitulo}`}>{titulo}</h3>

      {tipos.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tipos.map((tipo) => (
            // No Combate o nome do tipo fica sempre visível ao lado do ícone.
            <TypeIcon key={tipo} tipo={tipo} className={corChip} mostrarNome />
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      )}
    </div>
  );
}

// Até aqui cabe como botões lado a lado; acima (Rotom, Arceus) vira lista.
const MAX_BOTOES_FORMA = 4;

type SeletorFormaProps = {
  formas: FormaCombate[];
  selecionada: FormaCombate;
  onSelecionar: (id: string) => void;
};

function SeletorForma({ formas, selecionada, onSelecionar }: SeletorFormaProps) {
  if (formas.length > MAX_BOTOES_FORMA) {
    return (
      <label className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Forma</span>
        <select
          value={selecionada.id}
          onChange={(evento) => onSelecionar(evento.target.value)}
          className="rounded-lg border border-border bg-card px-2 py-1 text-sm"
        >
          {formas.map((forma) => (
            <option key={forma.id} value={forma.id}>
              {forma.nome}
            </option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <div
      role="group"
      aria-label="Forma"
      className="inline-flex flex-wrap rounded-lg bg-muted p-0.5"
    >
      {formas.map((forma) => (
        <button
          key={forma.id}
          type="button"
          onClick={() => onSelecionar(forma.id)}
          aria-pressed={forma.id === selecionada.id}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition",
            forma.id === selecionada.id
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {forma.nome}
        </button>
      ))}
    </div>
  );
}

export function PokemonCombat({ pokemon }: PokemonCombatProps) {
  const formas = obterFormasCombate(
    pokemon.oficial.numero,
    pokemon.oficial.tipos,
  );
  const [idForma, setIdForma] = useState<string>();

  // Sem escolha (ou escolha de outro Pokémon, ao navegar pelas setas) →
  // a primeira, que é a forma padrão da ficha.
  const forma = formas.find((item) => item.id === idForma) ?? formas[0];
  const tipos = forma?.tipos ?? pokemon.oficial.tipos;

  const { fortesContra, fraquezas, resistencias, imunidades } =
    calcularDerivados(tipos);

  return (
    <SectionCard
      title="Combate"
      actions={
        <InfoTip
          texto="Calculado a partir dos tipos oficiais do Pokémon, com foco em raid e ginásio: contra quais tipos ele bate forte, e quais tipos batem forte nele. Quando a forma muda o tipo (ex.: Zacian Herói × Espada Coroada), escolha a forma pra ver o combate dela."
          topico="combate"
        />
      }
    >
      <div className="space-y-5">
        {forma && formas.length > 1 && (
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <SeletorForma
                formas={formas}
                selecionada={forma}
                onSelecionar={setIdForma}
              />

              {/* Miniatura da forma escolhida — key pra trocar a imagem na
                  hora, sem mostrar a anterior enquanto a nova carrega. */}
              {forma.imagem && (
                <Image
                  key={forma.id}
                  src={forma.imagem}
                  alt={forma.nome}
                  width={64}
                  height={64}
                  // O ícone do GO tem margem transparente larga: margem
                  // negativa pra crescer sem empurrar os tipos pra baixo.
                  className="-my-4 h-16 w-16 shrink-0"
                />
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {forma.tipos.map((tipo) => (
                <TypeIcon
                  key={tipo}
                  tipo={tipo}
                  className="bg-secondary"
                  compact
                  mostrarNome
                />
              ))}
            </div>
          </div>
        )}

        {/* Ataque — contra quem os golpes dele são fortes (foco de raid/ginásio) */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            ⚔️ Atacando
          </p>

          <GrupoTipos
            titulo="🟢 Bom contra"
            tipos={fortesContra}
            corTitulo="text-good-foreground"
            corChip="bg-good"
          />
        </div>

        {/* Defesa — dano que ele RECEBE enquanto ataca */}
        <div className="border-t border-border pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            🛡️ Defendendo
          </p>

          <div className="grid grid-cols-2 gap-4">
            <GrupoTipos
              titulo="🔴 Fraco a"
              tipos={fraquezas}
              corTitulo="text-bad-foreground"
              corChip="bg-bad"
            />
            <GrupoTipos
              titulo="🟢 Resiste a"
              tipos={[...resistencias, ...imunidades]}
              corTitulo="text-good-foreground"
              corChip="bg-good"
              borda
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
