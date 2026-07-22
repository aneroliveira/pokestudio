import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { TIPOS } from "@/constants/pokemon";
import { TIPO_LABEL } from "@/constants/typeLabels";
import { MultiSelectField } from "@/components/admin/MultiSelectField";
import { FormSection } from "@/components/admin/FormSection";
import type { PokemonEditor } from "@/components/admin/usePokemonEditor";

type OficialTabProps = {
  pokemon: Pokemon;
  editor: PokemonEditor;
};

export function OficialTab({ pokemon, editor }: OficialTabProps) {
  const { evolucao } = pokemon.oficial;

  return (
    <div className="space-y-6">
      <FormSection title="⚔️ Tipos">
        <MultiSelectField
          label="Tipos"
          options={TIPOS.filter(Boolean)}
          value={pokemon.oficial.tipos}
          onChange={(tipos) =>
            editor.updateOficial("tipos", tipos as TipoPokemon[])
          }
        />
        <p className="text-xs text-zinc-500">
          {pokemon.oficial.tipos.length > 0
            ? pokemon.oficial.tipos
              .map((tipo) => TIPO_LABEL[tipo])
              .join(" • ")
            : "Nenhum tipo selecionado."}
        </p>
      </FormSection>

      <FormSection title="🧬 Evolução">
        <p className="text-sm text-zinc-600">
          <span className="font-medium">Anteriores:</span>{" "}
          {evolucao.anteriores.length > 0
            ? evolucao.anteriores.map((e) => e.nome).join(", ")
            : "—"}
        </p>
        <p className="text-sm text-zinc-600">
          <span className="font-medium">Próximas:</span>{" "}
          {evolucao.proximas.length > 0
            ? evolucao.proximas.map((e) => e.nome).join(", ")
            : "—"}
        </p>
        <p className="text-xs text-zinc-400">
          Sincronizado da PokéAPI.
        </p>
      </FormSection>
    </div>
  );
}
