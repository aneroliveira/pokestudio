import type { Dispatch, SetStateAction } from "react";
import type {
  DecisaoPokemon,
  Pokemon,
  StatusDecisao,
  TipoPokemon,
} from "@/models/pokemon";
import {
  CLIMAS,
  FUNCOES,
  REGIOES,
  TIERS,
  TIPOS,
} from "@/constants/pokemon";
import { CheckboxField } from "@/components/admin/CheckboxField";
import { SelectField } from "@/components/admin/SelectField";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { TextField } from "@/components/admin/TextField";

type PokemonFormProps = {
  pokemon: Pokemon;
  setPokemon: Dispatch<SetStateAction<Pokemon>>;
};

const DECISOES_PADRAO = [
  "Vale guardar",
  "Vale maximizar",
  "Vale Buddy",
  "Vale Elite TM",
  "Transferir",
] as const;

const STATUS_DECISAO: StatusDecisao[] = ["sim", "atencao", "nao"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-zinc-200 pt-6 first:border-t-0 first:pt-0">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function MultiSelectField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: readonly string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          >
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={(event) =>
                onChange(
                  event.target.checked
                    ? [...value, option]
                    : value.filter((item) => item !== option),
                )
              }
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function toNumber(value: string) {
  return value === "" ? undefined : Number(value);
}

export function PokemonForm({ pokemon, setPokemon }: PokemonFormProps) {
  function updatePokemon<K extends keyof Pokemon>(field: K, value: Pokemon[K]) {
    setPokemon((current) => ({ ...current, [field]: value }));
  }

  function updateDecision(title: string, status: StatusDecisao) {
    setPokemon((current) => {
      const existing = current.decisoes.find((item) => item.titulo === title);
      const decisao: DecisaoPokemon = { titulo: title, status };

      return {
        ...current,
        decisoes: existing
          ? current.decisoes.map((item) => (item.titulo === title ? decisao : item))
          : [...current.decisoes, decisao],
      };
    });
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Dados do Pokémon</h2>

      <div className="space-y-6">
        <Section title="Identificação">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="ID" type="number" value={String(pokemon.id)} onChange={(value) => updatePokemon("id", Number(value))} />
            <TextField label="Número da Pokédex" placeholder="#001" value={pokemon.numero} onChange={(numero) => updatePokemon("numero", numero)} />
            <TextField label="Nome" value={pokemon.nome} onChange={(nome) => updatePokemon("nome", nome)} />
            <SelectField label="Região" value={pokemon.regiao} options={REGIOES} onChange={(regiao) => updatePokemon("regiao", regiao)} />
          </div>
          <TextField label="URL da imagem" value={pokemon.imagem} onChange={(imagem) => updatePokemon("imagem", imagem)} />
          <MultiSelectField label="Tipos" options={TIPOS.filter(Boolean)} value={pokemon.tipos} onChange={(tipos) => updatePokemon("tipos", tipos as TipoPokemon[])} />
        </Section>

        <Section title="Avaliação">
          <div className="grid gap-4 sm:grid-cols-3">
            <SelectField label="Tier" value={pokemon.tier} options={TIERS} onChange={(tier) => updatePokemon("tier", tier as Pokemon["tier"])} />
            <SelectField label="Função" value={pokemon.funcao} options={FUNCOES} onChange={(funcao) => updatePokemon("funcao", funcao as Pokemon["funcao"])} />
            <SelectField label="Clima favorável" value={pokemon.climaFavoravel} options={CLIMAS} onChange={(climaFavoravel) => updatePokemon("climaFavoravel", climaFavoravel as Pokemon["climaFavoravel"])} />
          </div>
          <TextAreaField label="Descrição estratégica" value={pokemon.descricao} onChange={(descricao) => updatePokemon("descricao", descricao)} />
        </Section>

        <Section title="Uso">
          <div className="grid gap-3 sm:grid-cols-2">
            {(["raid", "rocket", "ginasio", "pvp"] as const).map((uso) => (
              <CheckboxField key={uso} label={{ raid: "Útil em Raid", rocket: "Útil contra Rocket", ginasio: "Útil em Ginásio", pvp: "Útil em PvP" }[uso]} checked={pokemon.uso[uso]} onChange={(checked) => setPokemon((current) => ({ ...current, uso: { ...current.uso, [uso]: checked } }))} />
            ))}
          </div>
        </Section>

        <Section title="Hundos">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Pesquisa (100%)" type="number" value={pokemon.hundos.pesquisa?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, hundos: { ...current.hundos, pesquisa: toNumber(value) } }))} />
            <TextField label="Raid sem clima (N20)" type="number" value={pokemon.hundos.raidNivel20?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, hundos: { ...current.hundos, raidNivel20: toNumber(value) } }))} />
            <TextField label="Raid com clima (N25)" type="number" value={pokemon.hundos.raidNivel25?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, hundos: { ...current.hundos, raidNivel25: toNumber(value) } }))} />
            <TextField label="98%" type="number" value={pokemon.quaseHundos.iv98?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, quaseHundos: { ...current.quaseHundos, iv98: toNumber(value) } }))} />
            <TextField label="96%" type="number" value={pokemon.quaseHundos.iv96?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, quaseHundos: { ...current.quaseHundos, iv96: toNumber(value) } }))} />
          </div>
        </Section>

        <Section title="Combate">
          <MultiSelectField label="Fraquezas" options={TIPOS.filter(Boolean)} value={pokemon.fraquezas} onChange={(fraquezas) => updatePokemon("fraquezas", fraquezas as TipoPokemon[])} />
          <MultiSelectField label="Resistências" options={TIPOS.filter(Boolean)} value={pokemon.resistencias} onChange={(resistencias) => updatePokemon("resistencias", resistencias as TipoPokemon[])} />
          <TextAreaField label="Melhores Megas (uma por linha)" value={pokemon.melhoresMegas.join("\n")} onChange={(value) => updatePokemon("melhoresMegas", value.split("\n").map((item) => item.trim()).filter(Boolean))} />
        </Section>

        <Section title="Decisões">
          <div className="grid gap-4 sm:grid-cols-2">
            {DECISOES_PADRAO.map((title) => (
              <SelectField key={title} label={title} value={pokemon.decisoes.find((item) => item.titulo === title)?.status ?? "atencao"} options={STATUS_DECISAO} onChange={(status) => updateDecision(title, status as StatusDecisao)} />
            ))}
          </div>
        </Section>

        <Section title="Evolução e Mega">
          <CheckboxField label="Possui evolução" checked={pokemon.evolucao.possui} onChange={(possui) => setPokemon((current) => ({ ...current, evolucao: { ...current.evolucao, possui } }))} />
          {pokemon.evolucao.possui && <div className="grid gap-4 sm:grid-cols-3"><TextField label="Doces" type="number" value={pokemon.evolucao.doces?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, evolucao: { ...current.evolucao, doces: toNumber(value) } }))} /><TextField label="Buddy (km)" type="number" value={pokemon.evolucao.buddyKm?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, evolucao: { ...current.evolucao, buddyKm: toNumber(value) } }))} /><TextField label="Requisito especial" value={pokemon.evolucao.requisito ?? ""} onChange={(requisito) => setPokemon((current) => ({ ...current, evolucao: { ...current.evolucao, requisito } }))} /></div>}
          <CheckboxField label="Possui Mega Evolução" checked={pokemon.mega.possui} onChange={(possui) => setPokemon((current) => ({ ...current, mega: { ...current.mega, possui } }))} />
          {pokemon.mega.possui && <TextField label="Nome da Mega" value={pokemon.mega.nome ?? ""} onChange={(nome) => setPokemon((current) => ({ ...current, mega: { ...current.mega, nome } }))} />}
        </Section>

        <Section title="Shadow e Buddy">
          <CheckboxField label="Possui versão Shadow" checked={pokemon.shadow.possuiShadow} onChange={(possuiShadow) => setPokemon((current) => ({ ...current, shadow: { ...current.shadow, possuiShadow } }))} />
          {pokemon.shadow.possuiShadow && <CheckboxField label="Recomendado purificar" checked={pokemon.shadow.recomendadoPurificar} onChange={(recomendadoPurificar) => setPokemon((current) => ({ ...current, shadow: { ...current.shadow, recomendadoPurificar } }))} />}
          <CheckboxField label="Precisa ser Buddy" checked={pokemon.buddy.necessario} onChange={(necessario) => setPokemon((current) => ({ ...current, buddy: { ...current.buddy, necessario } }))} />
          {pokemon.buddy.necessario && <div className="grid gap-4 sm:grid-cols-2"><TextField label="Distância (km)" type="number" value={pokemon.buddy.km?.toString() ?? ""} onChange={(value) => setPokemon((current) => ({ ...current, buddy: { ...current.buddy, km: toNumber(value) } }))} /><TextField label="Objetivo" value={pokemon.buddy.objetivo ?? ""} onChange={(objetivo) => setPokemon((current) => ({ ...current, buddy: { ...current.buddy, objetivo } }))} /></div>}
        </Section>

        <Section title="Observações">
          <TextAreaField label="Observações (uma por linha)" value={pokemon.observacoes.join("\n")} onChange={(value) => updatePokemon("observacoes", value.split("\n").map((item) => item.trim()).filter(Boolean))} />
        </Section>
      </div>
    </section>
  );
}
