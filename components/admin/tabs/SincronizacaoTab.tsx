import { useState, type Dispatch, type SetStateAction } from "react";
import type { Pokemon } from "@/models/pokemon";
import { TextField } from "@/components/admin/TextField";
import { FormSection } from "@/components/admin/FormSection";
import { importarPokemon } from "@/services/pokemon/importPokemon";
import { mergePokemon } from "@/services/pokemon/mergePokemon";
import {
  carregarStudioMap,
  salvarStudio,
} from "@/services/pokemon/studioStore";

type SincronizacaoTabProps = {
  pokemon: Pokemon;
  setPokemon: Dispatch<SetStateAction<Pokemon>>;
};

export function SincronizacaoTab({
  pokemon,
  setPokemon,
}: SincronizacaoTabProps) {
  const [loadingImport, setLoadingImport] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const dadosImportados = pokemon.oficial.numero !== "";

  async function buscarPokemon() {
    if (!pesquisa.trim()) return;

    try {
      setLoadingImport(true);
      setStatus(null);

      const importado = await importarPokemon(pesquisa);
      const studioMap = await carregarStudioMap();
      const salvo = studioMap[importado.oficial.numero];

      setPokemon((current) =>
        mergePokemon(
          { ...current, studio: salvo ?? current.studio },
          importado,
        ),
      );

      setStatus(
        salvo
          ? "🟢 Oficial importado. Curadoria salva restaurada."
          : "🟢 Oficial importado. Nenhuma curadoria salva ainda.",
      );
    } catch (error) {
      console.error(error);
      setStatus("🔴 Pokémon não encontrado.");
    } finally {
      setLoadingImport(false);
    }
  }

  async function salvar() {
    if (!dadosImportados) return;

    try {
      setSalvando(true);
      await salvarStudio(pokemon.oficial.numero, pokemon.studio);
      setStatus(`💾 Curadoria de ${pokemon.oficial.numero} salva.`);
    } catch (error) {
      console.error(error);
      setStatus("🔴 Erro ao salvar a curadoria.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <FormSection title="🔍 Sincronização">
      <TextField
        label="Nome do Pokémon (inglês)"
        value={pesquisa}
        onChange={setPesquisa}
      />

      <button
        type="button"
        onClick={buscarPokemon}
        disabled={loadingImport}
        className="w-full rounded-lg bg-indigo-600 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {loadingImport ? "Importando..." : "Importar PokéAPI"}
      </button>

      <button
        type="button"
        onClick={salvar}
        disabled={!dadosImportados || salvando}
        className="w-full rounded-lg bg-emerald-600 py-2 text-white transition hover:bg-emerald-700 disabled:opacity-50"
      >
        {salvando ? "Salvando..." : "💾 Salvar curadoria"}
      </button>

      {status && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
          {status}
        </div>
      )}
    </FormSection>
  );
}
