import type { Pokemon, StatusDecisao } from "@/models/pokemon";
import { FUNCOES, MELHOR_PARA, TIERS } from "@/constants/pokemon";
import { SelectField } from "@/components/admin/SelectField";
import { TextField } from "@/components/admin/TextField";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { MultiSelectField } from "@/components/admin/MultiSelectField";
import { FormSection } from "@/components/admin/FormSection";
import type { PokemonEditor } from "@/components/admin/usePokemonEditor";

type EstrategiaTabProps = {
  pokemon: Pokemon;
  editor: PokemonEditor;
};

const DECISOES_PADRAO = [
  "Vale guardar",
  "Vale maximizar",
  "Vale Buddy",
  "Vale Elite TM",
  "Transferir",
] as const;

const STATUS_DECISAO: StatusDecisao[] = ["sim", "atencao", "nao"];

export function EstrategiaTab({ pokemon, editor }: EstrategiaTabProps) {
  const { estrategia, conhecimento } = pokemon.studio;

  return (
    <div className="space-y-6">
      <FormSection title="🏆 Classificação">
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Tier"
            value={estrategia.tier}
            options={TIERS}
            onChange={(tier) =>
              editor.updateEstrategia(
                "tier",
                tier as Pokemon["studio"]["estrategia"]["tier"],
              )
            }
          />
          <SelectField
            label="Função"
            value={estrategia.funcao}
            options={FUNCOES}
            onChange={(funcao) =>
              editor.updateEstrategia(
                "funcao",
                funcao as Pokemon["studio"]["estrategia"]["funcao"],
              )
            }
          />
        </div>
        <MultiSelectField
          label="Melhor para"
          options={MELHOR_PARA}
          value={estrategia.melhorPara}
          onChange={(melhorPara) =>
            editor.updateEstrategia(
              "melhorPara",
              melhorPara as Pokemon["studio"]["estrategia"]["melhorPara"],
            )
          }
        />
      </FormSection>

      <FormSection title="Decisões">
        <div className="grid gap-4 sm:grid-cols-2">
          {DECISOES_PADRAO.map((title) => {
            const atual = conhecimento.decisoes.find(
              (item) => item.titulo === title,
            );

            return (
              <div
                key={title}
                className="space-y-2 rounded-lg border border-border p-3"
              >
                <SelectField
                  label={title}
                  value={atual?.status ?? "atencao"}
                  options={STATUS_DECISAO}
                  onChange={(status) =>
                    editor.updateDecision(title, {
                      status: status as StatusDecisao,
                    })
                  }
                />
                <TextField
                  label="Motivo (opcional)"
                  value={atual?.motivo ?? ""}
                  placeholder="Por que essa decisão?"
                  onChange={(motivo) =>
                    editor.updateDecision(title, { motivo })
                  }
                />
              </div>
            );
          })}
        </div>
      </FormSection>

      <FormSection title="🤝 Sinergias">
        <TextAreaField
          label="Sinergias (uma por linha)"
          value={conhecimento.sinergias?.join("\n") ?? ""}
          onChange={(value) =>
            editor.updateConhecimento(
              "sinergias",
              value
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
        />
      </FormSection>

      <FormSection title="Observações">
        <TextAreaField
          label="Observações (uma por linha)"
          value={conhecimento.observacoes.join("\n")}
          onChange={(value) =>
            editor.updateConhecimento(
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
  );
}
