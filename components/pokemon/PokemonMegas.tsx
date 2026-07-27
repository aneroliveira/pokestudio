import Image from "next/image";
import type { Pokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { recomendarMegasContra } from "@/services/pokemon/recomendarMega";

const LIMITE = 3;

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
  const recomendadas = recomendarMegasContra(pokemon.oficial.tipos, {
    limite: LIMITE,
  });

  return (
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
                <Image
                  src={mega.imagem}
                  alt=""
                  width={64}
                  height={64}
                />
              )}

              <span className="text-xs font-medium leading-tight">
                {mega.nome}
              </span>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5">
                  <TypeIcon tipo={melhorTipo} className="bg-secondary" compact />
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
  );
}
