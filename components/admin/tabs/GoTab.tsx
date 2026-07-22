import type { Pokemon } from "@/models/pokemon";
import { ESTADOS_GO } from "@/constants/pokemon";
import { CheckboxField } from "@/components/admin/CheckboxField";
import { SelectField } from "@/components/admin/SelectField";
import { TextAreaField } from "@/components/admin/TextAreaField";
import { TextField } from "@/components/admin/TextField";
import { FormSection } from "@/components/admin/FormSection";
import type { PokemonEditor } from "@/components/admin/usePokemonEditor";
import { calcularHundosPorNumero } from "@/services/pokemon/statsGO";

type GoTabProps = {
  pokemon: Pokemon;
  editor: PokemonEditor;
};

function toNumber(value: string) {
  return value === "" ? undefined : Number(value);
}

function BotaoUsar({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 transition hover:bg-indigo-100"
    >
      usar
    </button>
  );
}

export function GoTab({ pokemon, editor }: GoTabProps) {
  const { estado, shadow, buddy, hundos, quaseHundos } = pokemon.studio.go;
  const calculado = calcularHundosPorNumero(pokemon.oficial.numero);

  return (
    <div className="space-y-6">
      <FormSection title="⭐ Forma Especial">
        <SelectField
          label="Tipo"
          value={estado.tipo}
          options={ESTADOS_GO}
          onChange={(tipo) =>
            editor.updateEstado(
              "tipo",
              tipo as Pokemon["studio"]["go"]["estado"]["tipo"],
            )
          }
        />

        <CheckboxField
          label="Vale investir"
          checked={estado.valeInvestir}
          onChange={(valeInvestir) =>
            editor.updateEstado("valeInvestir", valeInvestir)
          }
        />

        <TextAreaField
          label="Motivo"
          value={estado.motivo}
          onChange={(motivo) => editor.updateEstado("motivo", motivo)}
        />
      </FormSection>

      <FormSection title="👤 Shadow">
        <CheckboxField
          label="Possui versão Shadow"
          checked={shadow.possuiShadow}
          onChange={(possuiShadow) =>
            editor.updateShadow("possuiShadow", possuiShadow)
          }
        />

        {shadow.possuiShadow && (
          <CheckboxField
            label="Vale purificar"
            checked={shadow.recomendadoPurificar}
            onChange={(recomendadoPurificar) =>
              editor.updateShadow(
                "recomendadoPurificar",
                recomendadoPurificar,
              )
            }
          />
        )}
      </FormSection>

      <FormSection title="🤝 Buddy">
        <CheckboxField
          label="Necessário"
          checked={buddy.necessario}
          onChange={(necessario) =>
            editor.updateBuddy("necessario", necessario)
          }
        />

        {buddy.necessario && (
          <TextField
            label="Objetivo"
            value={buddy.objetivo ?? ""}
            onChange={(objetivo) => editor.updateBuddy("objetivo", objetivo)}
          />
        )}
      </FormSection>

      <FormSection title="Hundos">
        {calculado ? (
          <div className="space-y-2 rounded-lg border border-indigo-100 bg-indigo-50/50 p-3">
            <p className="text-xs font-medium text-indigo-700">
              🧮 Calculado (base stats do GO + CPM)
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex items-center justify-between text-sm">
                <span>Sem clima (N20): {calculado.semClima}</span>
                <BotaoUsar
                  onClick={() =>
                    editor.updateHundos("semClima", calculado.semClima)
                  }
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Com clima (N25): {calculado.comClima}</span>
                <BotaoUsar
                  onClick={() =>
                    editor.updateHundos("comClima", calculado.comClima)
                  }
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>98%: {calculado.quaseHundos.iv98}</span>
                <BotaoUsar
                  onClick={() =>
                    editor.updateQuaseHundos(
                      "iv98",
                      calculado.quaseHundos.iv98,
                    )
                  }
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>96%: {calculado.quaseHundos.iv96}</span>
                <BotaoUsar
                  onClick={() =>
                    editor.updateQuaseHundos(
                      "iv96",
                      calculado.quaseHundos.iv96,
                    )
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-400">
            Sem base stats do GO para este número (Megas/formas alternativas
            não estão cobertas) — preencha manualmente.
          </p>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Raid sem clima (N20)"
            type="number"
            value={hundos.semClima?.toString() ?? ""}
            onChange={(value) =>
              editor.updateHundos(
                "semClima",
                value === "" ? undefined : Number(value),
              )
            }
          />
          <TextField
            label="Raid com clima (N25)"
            type="number"
            value={hundos.comClima?.toString() ?? ""}
            onChange={(value) =>
              editor.updateHundos(
                "comClima",
                value === "" ? undefined : Number(value),
              )
            }
          />
          <TextField
            label="98%"
            type="number"
            value={quaseHundos.iv98?.toString() ?? ""}
            onChange={(value) =>
              editor.updateQuaseHundos("iv98", toNumber(value))
            }
          />
          <TextField
            label="96%"
            type="number"
            value={quaseHundos.iv96?.toString() ?? ""}
            onChange={(value) =>
              editor.updateQuaseHundos("iv96", toNumber(value))
            }
          />
        </div>
      </FormSection>
    </div>
  );
}
