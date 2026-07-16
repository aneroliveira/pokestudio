import { useState, type Dispatch, type SetStateAction } from "react";
import type {
  DecisaoPokemon,
  Pokemon,
  StatusDecisao,
  TipoPokemon,
} from "@/models/pokemon";
import {
  CLIMAS,
  FORMAS_ESPECIAIS,
  FUNCOES,
  MELHOR_PARA,
  REGIOES,
  TIERS,
  TIPOS,
} from "@/constants/pokemon";
import { CheckboxField } from "@/components/admin/CheckboxField";
import { SelectField } from "@/components/admin/SelectField";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { TextField } from "@/components/admin/TextField";
import { FormSection } from "./FormSection";
import { buscarPokemonNaApi } from "@/services/pokemon/pokeApi";
import { mapearPokemonBasico } from "@/services/pokemon/pokemonMapper";

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
  const [loadingPokemon, setLoadingPokemon] = useState(false);
  function updatePokemon<K extends keyof Pokemon>(field: K, value: Pokemon[K]) {
    setPokemon((current) => ({ ...current, [field]: value }));
  }

  async function buscarPokemon() {
    if (!pokemon.nome.trim()) return;

    try {
      setLoadingPokemon(true);

      const data = await buscarPokemonNaApi(pokemon.nome);

      const pokemonMapeado =
        mapearPokemonBasico(data);

      setPokemon((current) => ({
        ...current,
        ...pokemonMapeado,
      }));

    } catch (error) {
      console.error(error);
      alert("Pokémon não encontrado.");
    } finally {
      setLoadingPokemon(false);
    }
  }

  function updateDecision(title: string, status: StatusDecisao) {
    setPokemon((current) => {
      const existing = current.decisoes.find((item) => item.titulo === title);
      const decisao: DecisaoPokemon = { titulo: title, status };

      return {
        ...current,
        decisoes: existing
          ? current.decisoes.map((item) =>
            item.titulo === title ? decisao : item,
          )
          : [...current.decisoes, decisao],
      };
    });
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">Dados do Pokémon</h2>

      <div className="space-y-6">
        <FormSection title="📌 Identificação">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Número da Pokédex"
              placeholder="#001"
              value={pokemon.numero}
              onChange={(numero) => updatePokemon("numero", numero)}
            />
            <TextField
              label="Nome"
              value={pokemon.nome}
              onChange={(nome) => updatePokemon("nome", nome)}
              rightElement={
                <button
                  type="button"
                  onClick={buscarPokemon}
                  disabled={loadingPokemon}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loadingPokemon ? "..." : "Buscar"}
                </button>
              }
            />
            <SelectField
              label="Região"
              value={pokemon.regiao}
              options={REGIOES}
              onChange={(regiao) => updatePokemon("regiao", regiao)}
            />
          </div>
          <TextField
            label="URL da imagem"
            value={pokemon.imagem}
            onChange={(imagem) => updatePokemon("imagem", imagem)}
          />
          <MultiSelectField
            label="Tipos"
            options={TIPOS.filter(Boolean)}
            value={pokemon.tipos}
            onChange={(tipos) => updatePokemon("tipos", tipos as TipoPokemon[])}
          />
        </FormSection>

        <FormSection title="🏆 Classificação">
          <div className="grid gap-4 sm:grid-cols-3">
            <SelectField
              label="Tier"
              value={pokemon.tier}
              options={TIERS}
              onChange={(tier) => updatePokemon("tier", tier as Pokemon["tier"])}
            />
            <SelectField
              label="Função"
              value={pokemon.funcao}
              options={FUNCOES}
              onChange={(funcao) =>
                updatePokemon("funcao", funcao as Pokemon["funcao"])
              }
            />
            <SelectField
              label="Clima favorável"
              value={pokemon.climaFavoravel}
              options={CLIMAS}
              onChange={(climaFavoravel) =>
                updatePokemon(
                  "climaFavoravel",
                  climaFavoravel as Pokemon["climaFavoravel"],
                )
              }
            />
            <MultiSelectField
              label="Melhor para"
              options={MELHOR_PARA}
              value={pokemon.melhorPara}
              onChange={(melhorPara) =>
                updatePokemon(
                  "melhorPara",
                  melhorPara as Pokemon["melhorPara"],
                )
              }
            />
          </div>
        </FormSection>

        <FormSection title="⭐ Forma Especial">
          <SelectField
            label="Tipo"
            value={pokemon.formaEspecial.tipo}
            options={FORMAS_ESPECIAIS}
            onChange={(tipo) =>
              setPokemon((current) => ({
                ...current,
                formaEspecial: {
                  ...current.formaEspecial,
                  tipo: tipo as Pokemon["formaEspecial"]["tipo"],
                },
              }))
            }
          />

          <TextField
            label="Nome"
            value={pokemon.formaEspecial.nome}
            onChange={(nome) =>
              setPokemon((current) => ({
                ...current,
                formaEspecial: {
                  ...current.formaEspecial,
                  nome,
                },
              }))
            }
          />

          <CheckboxField
            label="Vale investir"
            checked={pokemon.formaEspecial.valeInvestir}
            onChange={(valeInvestir) =>
              setPokemon((current) => ({
                ...current,
                formaEspecial: {
                  ...current.formaEspecial,
                  valeInvestir,
                },
              }))
            }
          />

          <TextAreaField
            label="Motivo"
            value={pokemon.formaEspecial.motivo}
            onChange={(motivo) =>
              setPokemon((current) => ({
                ...current,
                formaEspecial: {
                  ...current.formaEspecial,
                  motivo,
                },
              }))
            }
          />
        </FormSection>

        <FormSection title="👤 Shadow">
          <CheckboxField
            label="Possui versão Shadow"
            checked={pokemon.shadow.possuiShadow}
            onChange={(possuiShadow) =>
              setPokemon((current) => ({
                ...current,
                shadow: {
                  ...current.shadow,
                  possuiShadow,
                },
              }))
            }
          />

          {pokemon.shadow.possuiShadow && (
            <CheckboxField
              label="Vale purificar"
              checked={pokemon.shadow.recomendadoPurificar}
              onChange={(recomendadoPurificar) =>
                setPokemon((current) => ({
                  ...current,
                  shadow: {
                    ...current.shadow,
                    recomendadoPurificar,
                  },
                }))
              }
            />
          )}
        </FormSection>

        <FormSection title="🤝 Buddy">
          <CheckboxField
            label="Necessário"
            checked={pokemon.buddy.necessario}
            onChange={(necessario) =>
              setPokemon((current) => ({
                ...current,
                buddy: {
                  ...current.buddy,
                  necessario,
                },
              }))
            }
          />

          {pokemon.buddy.necessario && (
            <TextField
              label="Objetivo"
              value={pokemon.buddy.objetivo ?? ""}
              onChange={(objetivo) =>
                setPokemon((current) => ({
                  ...current,
                  buddy: {
                    ...current.buddy,
                    objetivo,
                  },
                }))
              }
            />
          )}
        </FormSection>

        <FormSection title="🧬 Evolução">
          <CheckboxField
            label="Possui evolução"
            checked={pokemon.evolucao?.possuiEvolucao ?? false}
            onChange={(possuiEvolucao) =>
              setPokemon((current) => ({
                ...current,
                evolucao: {
                  ...current.evolucao,
                  possuiEvolucao,
                },
              }))
            }
          />

          <TextField
            label="Doces"
            type="number"
            value={pokemon.evolucao.doces?.toString() ?? ""}
            onChange={(value) =>
              setPokemon((current) => ({
                ...current,
                evolucao: {
                  ...current.evolucao,
                  doces: value === "" ? undefined : Number(value),
                },
              }))
            }
          />

          <TextField
            label="Requisito"
            value={pokemon.evolucao?.requisito ?? ""}
            onChange={(requisito) =>
              setPokemon((current) => ({
                ...current,
                evolucao: {
                  ...current.evolucao,
                  requisito,
                },
              }))
            }
          />
        </FormSection>

        <FormSection title="🤝 Sinergias">
          <TextAreaField
            label="Sinergias (uma por linha)"
            value={pokemon.sinergias?.join("\n") ?? ""}
            onChange={(value) =>
              updatePokemon(
                "sinergias",
                value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </FormSection>

        <FormSection title="Hundos">
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Raid sem clima (N20)"
              type="number"
              value={pokemon.hundos.semClima?.toString() ?? ""}
              onChange={(value) =>
                setPokemon((current) => ({
                  ...current,
                  hundos: {
                    ...current.hundos,
                    semClima: value === "" ? 0 : Number(value),
                  },
                }))
              }
            />
            <TextField
              label="Raid com clima (N25)"
              type="number"
              value={pokemon.hundos.comClima?.toString() ?? ""}
              onChange={(value) =>
                setPokemon((current) => ({
                  ...current,
                  hundos: {
                    ...current.hundos,
                    comClima: value === "" ? 0 : Number(value),
                  },
                }))
              }
            />
            <TextField
              label="98%"
              type="number"
              value={pokemon.quaseHundos.iv98?.toString() ?? ""}
              onChange={(value) =>
                setPokemon((current) => ({
                  ...current,
                  quaseHundos: {
                    ...current.quaseHundos,
                    iv98: toNumber(value),
                  },
                }))
              }
            />
            <TextField
              label="96%"
              type="number"
              value={pokemon.quaseHundos.iv96?.toString() ?? ""}
              onChange={(value) =>
                setPokemon((current) => ({
                  ...current,
                  quaseHundos: {
                    ...current.quaseHundos,
                    iv96: toNumber(value),
                  },
                }))
              }
            />
          </div>
        </FormSection>

        <FormSection title="⚔️ Combate">
          <MultiSelectField
            label="Fraquezas"
            options={TIPOS.filter(Boolean)}
            value={pokemon.fraquezas}
            onChange={(fraquezas) =>
              updatePokemon("fraquezas", fraquezas as TipoPokemon[])
            }
          />

          <MultiSelectField
            label="Resistências"
            options={TIPOS.filter(Boolean)}
            value={pokemon.resistencias}
            onChange={(resistencias) =>
              updatePokemon("resistencias", resistencias as TipoPokemon[])
            }
          />
        </FormSection>

        <FormSection title="Decisões">
          <div className="grid gap-4 sm:grid-cols-2">
            {DECISOES_PADRAO.map((title) => (
              <SelectField
                key={title}
                label={title}
                value={
                  pokemon.decisoes.find((item) => item.titulo === title)?.status ??
                  "atencao"
                }
                options={STATUS_DECISAO}
                onChange={(status) =>
                  updateDecision(title, status as StatusDecisao)
                }
              />
            ))}
          </div>
        </FormSection>

        <FormSection title="Observações">
          <TextAreaField
            label="Observações (uma por linha)"
            value={pokemon.observacoes.join("\n")}
            onChange={(value) =>
              updatePokemon(
                "observacoes",
                value
                  .split("\n")
                  .map((item) => item.trim())
                  .filter(Boolean),
              )
            }
          />
        </FormSection>
      </div>
    </section>
  );
}
