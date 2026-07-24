"use client";
import { useState } from "react";
import type { PokemonStudio } from "@/models/pokemon";
import { createEmptyPokemon } from "@/utils/createEmptyPokemon";
import { Tabs } from "@/components/ui/Tabs";
import { usePokemonEditor } from "@/components/admin/usePokemonEditor";
import { abaPossuiDados } from "@/components/admin/tabAvailability";
import { GeralTab } from "@/components/admin/tabs/GeralTab";
import { OficialTab } from "@/components/admin/tabs/OficialTab";
import { FormsTab } from "@/components/admin/tabs/FormsTab";
import { GoTab } from "@/components/admin/tabs/GoTab";
import { EstrategiaTab } from "@/components/admin/tabs/EstrategiaTab";
import { SincronizacaoTab } from "@/components/admin/tabs/SincronizacaoTab";
import { PreviewTab } from "@/components/admin/tabs/PreviewTab";
import { PokemonCard } from "@/components/pokemon/PokemonCard";

const ABAS = [
  "Sincronização",
  "Geral",
  "Oficial",
  "GO",
  "Estratégia",
  "Forms",
  "Preview",
] as const;

type Aba = (typeof ABAS)[number];

export default function AdminPage() {
  const [pokemon, setPokemon] = useState(createEmptyPokemon());
  const [aba, setAba] = useState<Aba>("Sincronização");
  const [studioBaseline, setStudioBaseline] = useState<string | null>(null);
  const editor = usePokemonEditor(setPokemon);

  const dadosImportados = pokemon.oficial.numero !== "";
  const naoSalvo =
    dadosImportados &&
    studioBaseline !== null &&
    JSON.stringify(pokemon.studio) !== studioBaseline;

  function marcarBaseline(studio: PokemonStudio) {
    setStudioBaseline(JSON.stringify(studio));
  }

  const marcadas = Object.fromEntries(
    ABAS.map((item) => [item, abaPossuiDados(pokemon, item)]),
  ) as Partial<Record<Aba, boolean>>;

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Workspace de Pokémon</h1>
          <p className="mt-2 text-muted-foreground">
            Ferramenta interna do PokéStudio
          </p>
        </div>

        {naoSalvo && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            não salvo
          </span>
        )}
      </div>

      <div
        className={`mt-8 grid min-w-0 gap-8 ${
          dadosImportados ? "lg:grid-cols-[1fr_380px]" : ""
        }`}
      >
        <div className="min-w-0">
          <Tabs abas={ABAS} ativa={aba} onChange={setAba} marcadas={marcadas} />

          <section className="mt-6 min-w-0 rounded-xl border border-border bg-card p-6 shadow-sm">
            {aba === "Sincronização" && (
              <SincronizacaoTab
                pokemon={pokemon}
                setPokemon={setPokemon}
                onSincronizado={marcarBaseline}
                onSalvo={() => marcarBaseline(pokemon.studio)}
              />
            )}
            {aba === "Geral" && <GeralTab pokemon={pokemon} />}
            {aba === "Oficial" && <OficialTab pokemon={pokemon} />}
            {aba === "GO" && <GoTab pokemon={pokemon} editor={editor} />}
            {aba === "Estratégia" && (
              <EstrategiaTab pokemon={pokemon} editor={editor} />
            )}
            {aba === "Forms" && <FormsTab pokemon={pokemon} />}
            {aba === "Preview" && <PreviewTab pokemon={pokemon} />}
          </section>
        </div>

        {dadosImportados && (
          <div className="min-w-0 lg:sticky lg:top-8 lg:self-start">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Preview ao vivo
            </p>
            <PokemonCard pokemon={pokemon} />
          </div>
        )}
      </div>
    </main>
  );
}
