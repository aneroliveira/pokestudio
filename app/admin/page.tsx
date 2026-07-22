"use client";
import { useState } from "react";
import { createEmptyPokemon } from "@/utils/createEmptyPokemon";
import { Tabs } from "@/components/ui/Tabs";
import { usePokemonEditor } from "@/components/admin/usePokemonEditor";
import { GeralTab } from "@/components/admin/tabs/GeralTab";
import { OficialTab } from "@/components/admin/tabs/OficialTab";
import { FormsTab } from "@/components/admin/tabs/FormsTab";
import { GoTab } from "@/components/admin/tabs/GoTab";
import { EstrategiaTab } from "@/components/admin/tabs/EstrategiaTab";
import { SincronizacaoTab } from "@/components/admin/tabs/SincronizacaoTab";
import { PreviewTab } from "@/components/admin/tabs/PreviewTab";

const ABAS = [
  "Geral",
  "Oficial",
  "GO",
  "Estratégia",
  "Forms",
  "Sincronização",
  "Preview",
] as const;

type Aba = (typeof ABAS)[number];

export default function AdminPage() {
  const [pokemon, setPokemon] = useState(createEmptyPokemon());
  const [aba, setAba] = useState<Aba>("Geral");
  const editor = usePokemonEditor(setPokemon);

  return (
    <main className="mx-auto max-w-5xl p-8">
      <h1 className="text-3xl font-bold">Workspace de Pokémon</h1>

      <p className="mt-2 text-zinc-500">
        Ferramenta interna do PokéStudio
      </p>

      <div className="mt-8">
        <Tabs abas={ABAS} ativa={aba} onChange={setAba} />
      </div>

      <section className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {aba === "Geral" && (
          <GeralTab pokemon={pokemon} editor={editor} />
        )}
        {aba === "Oficial" && (
          <OficialTab pokemon={pokemon} editor={editor} />
        )}
        {aba === "GO" && <GoTab pokemon={pokemon} editor={editor} />}
        {aba === "Estratégia" && (
          <EstrategiaTab pokemon={pokemon} editor={editor} />
        )}
        {aba === "Forms" && <FormsTab pokemon={pokemon} />}
        {aba === "Sincronização" && (
          <SincronizacaoTab pokemon={pokemon} setPokemon={setPokemon} />
        )}
        {aba === "Preview" && <PreviewTab pokemon={pokemon} />}
      </section>
    </main>
  );
}
