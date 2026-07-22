import { useState, type Dispatch, type SetStateAction } from "react";
import type { Pokemon, PokemonStudio } from "@/models/pokemon";
import type { ItemIndicePokemon } from "@/models/indice";
import { FormSection } from "@/components/admin/FormSection";
import { buscarPokemon } from "@/services/pokemon/buscarPokemon";
import { importarPokemon } from "@/services/pokemon/importPokemon";
import { mergePokemon } from "@/services/pokemon/mergePokemon";
import {
  carregarStudioMap,
  salvarStudio,
} from "@/services/pokemon/studioStore";

type SincronizacaoTabProps = {
  pokemon: Pokemon;
  setPokemon: Dispatch<SetStateAction<Pokemon>>;
  onSalvo: () => void;
  onSincronizado: (studio: PokemonStudio) => void;
};

function formatarNome(nomeEn: string) {
  return nomeEn
    .split("-")
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(" ");
}

export function SincronizacaoTab({
  pokemon,
  setPokemon,
  onSalvo,
  onSincronizado,
}: SincronizacaoTabProps) {
  const [loadingImport, setLoadingImport] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [pesquisa, setPesquisa] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const dadosImportados = pokemon.oficial.numero !== "";
  const resultados = buscarPokemon(pesquisa);

  async function importar(nomeEn: string) {
    setPesquisa("");

    try {
      setLoadingImport(true);
      setStatus(null);

      const importado = await importarPokemon(nomeEn);
      const studioMap = await carregarStudioMap();
      const salvo = studioMap[importado.oficial.numero];
      const studio = salvo ?? pokemon.studio;

      setPokemon((current) =>
        mergePokemon({ ...current, studio }, importado),
      );
      onSincronizado(studio);

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
      onSalvo();
    } catch (error) {
      console.error(error);
      setStatus("🔴 Erro ao salvar a curadoria.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <FormSection title="🔍 Sincronização">
      <div className="relative">
        <label className="mb-1 block text-sm font-medium">
          Buscar Pokémon (nome em inglês ou número)
        </label>
        <input
          value={pesquisa}
          onChange={(event) => setPesquisa(event.target.value)}
          placeholder="ex.: gengar, #094"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2"
        />

        {pesquisa && resultados.length > 0 && (
          <div className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-xl border bg-white shadow-lg">
            {resultados.map((item: ItemIndicePokemon) => (
              <div
                key={item.numero}
                onClick={() => importar(item.nomeEn)}
                className="cursor-pointer border-b p-3 text-sm transition-colors hover:bg-zinc-50 last:border-b-0"
              >
                {item.numero} • {formatarNome(item.nomeEn)}
              </div>
            ))}
          </div>
        )}

        {pesquisa && resultados.length === 0 && (
          <p className="mt-1 text-sm text-zinc-400">
            Nenhum Pokémon encontrado.
          </p>
        )}
      </div>

      {loadingImport && (
        <p className="text-sm text-zinc-500">Importando...</p>
      )}

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
