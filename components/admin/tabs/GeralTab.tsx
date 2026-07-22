import type { Pokemon } from "@/models/pokemon";
import { REGIOES } from "@/constants/pokemon";
import { TextField } from "@/components/admin/TextField";
import { SelectField } from "@/components/admin/SelectField";
import { FormSection } from "@/components/admin/FormSection";
import type { PokemonEditor } from "@/components/admin/usePokemonEditor";

type GeralTabProps = {
  pokemon: Pokemon;
  editor: PokemonEditor;
};

export function GeralTab({ pokemon, editor }: GeralTabProps) {
  const dadosImportados = pokemon.oficial.numero !== "";

  return (
    <FormSection title="📌 Identificação">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Número da Pokédex"
          placeholder="#001"
          value={pokemon.oficial.numero}
          readOnly={dadosImportados}
          onChange={(numero) => editor.updateOficial("numero", numero)}
        />

        <SelectField
          label="Região"
          value={pokemon.oficial.regiao}
          options={REGIOES}
          onChange={(regiao) => editor.updateOficial("regiao", regiao)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label="Nome (pt-BR)"
          value={pokemon.oficial.nome.ptBR}
          onChange={(ptBR) => editor.updateNome("ptBR", ptBR)}
        />
        <TextField
          label="Nome (en-US)"
          value={pokemon.oficial.nome.enUS}
          onChange={(enUS) => editor.updateNome("enUS", enUS)}
        />
      </div>

      <TextField
        label="URL da imagem"
        value={pokemon.oficial.imagem}
        readOnly={dadosImportados}
        onChange={(imagem) => editor.updateOficial("imagem", imagem)}
      />
    </FormSection>
  );
}
