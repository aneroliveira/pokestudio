import Image from "next/image";
import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { InfoRow } from "@/components/ui/InfoRow";
import { TypeIcon } from "@/components/ui/TypeIcon";
import {
  MEGAS,
  recomendarMegasContra,
  type EntradaMega,
} from "@/services/pokemon/recomendarMega";
import { calcularCP } from "@/services/pokemon/statsGO";

const LIMITE = 3;

// Mesmo teto de 100% (15/15/15) usado no Hundos, aplicado aos stats da
// própria Mega — RFC-002 bônus A ("vale a Mega dele?").
const HUNDO = { atk: 15, def: 15, sta: 15 };
const NIVEL_SEM_CLIMA = 20;
const NIVEL_COM_CLIMA = 25;

type SuaMegaProps = {
  megas: EntradaMega[];
};

function SuaMega({ megas }: SuaMegaProps) {
  if (megas.length === 0) return null;

  return (
    <SectionCard title="Sua Mega">
      <div className="space-y-5">
        {megas.map((mega) => (
          <div key={mega.id} className="space-y-2">
            <div className="flex items-center gap-2">
              {mega.imagem && (
                <Image src={mega.imagem} alt="" width={40} height={40} />
              )}
              <span className="font-medium">{mega.nome}</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {mega.tipos.map((tipo) => (
                <TypeIcon
                  key={tipo}
                  tipo={tipo}
                  className="bg-secondary"
                  compact
                  mostrarNome
                />
              ))}
            </div>

            <InfoRow
              label="Sem clima"
              hint={`Nível ${NIVEL_SEM_CLIMA} · Raid e Ovo`}
              value={calcularCP(mega.stats, HUNDO, NIVEL_SEM_CLIMA)}
            />
            <InfoRow
              label="Com clima"
              hint={`Nível ${NIVEL_COM_CLIMA} · Clima favorável`}
              value={calcularCP(mega.stats, HUNDO, NIVEL_COM_CLIMA)}
            />
          </div>
        ))}

        <p className="text-xs text-muted-foreground">
          🧮 CP de uma Mega 100% (15/15/15), com os stats já ativos da Mega
          (não da forma base).
        </p>
      </div>
    </SectionCard>
  );
}

// Rótulo qualitativo de efetividade. O GO não usa os multiplicadores 2×/4× da
// série principal (lá é ×1,6 e ×2,56), então mostramos o significado em vez do
// número: > 2 = supereficaz contra os dois tipos (fraqueza dupla).
function rotuloEfetividade(efetividade: number): string {
  return efetividade > 2 ? "Fraqueza dupla" : "Supereficaz";
}

type PokemonMegasProps = {
  pokemon: Pokemon;
};

export function PokemonMegas({ pokemon }: PokemonMegasProps) {
  // Comparação numérica: "numeroBase" do roster (#6) não é zero-padded como
  // "oficial.numero" (#006) — string direta perderia todo dex < 100.
  const dexAtual = Number(pokemon.oficial.numero.replace("#", ""));
  const proprias = MEGAS.filter(
    (mega) => Number(mega.numeroBase.replace("#", "")) === dexAtual,
  );
  const recomendadas = recomendarMegasContra(pokemon.oficial.tipos, {
    limite: LIMITE,
  });

  return (
    <>
      <SuaMega megas={proprias} />

      <SectionCard title="Melhor Mega contra">
        {recomendadas.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhuma Mega super efetiva conhecida.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {recomendadas.map(({ mega, melhorTipo, efetividade }) => (
              <div
                key={mega.id}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-accent p-3 text-center"
              >
                {mega.imagem && (
                  <Image src={mega.imagem} alt="" width={64} height={64} />
                )}

                <span className="text-xs font-medium leading-tight">
                  {mega.nome}
                </span>

                <div className="flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5">
                    <TypeIcon
                      tipo={melhorTipo}
                      className="bg-secondary"
                      compact
                    />
                    <span className="text-sm font-semibold text-primary">
                      {efetividade}×
                    </span>
                  </div>
                  <span className="text-center text-xs font-medium leading-tight text-muted-foreground">
                    {rotuloEfetividade(efetividade)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </>
  );
}
