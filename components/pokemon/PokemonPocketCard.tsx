import Image from "next/image";
import type { Pokemon } from "@/models/pokemon";
import { Card } from "@/components/ui/Card";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { ToggleChip } from "@/components/ui/ToggleChip";
import { useMegaShiny } from "@/components/pokemon/useMegaShiny";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";
import {
  calcularHundosPorNumero,
  NIVEIS_REFERENCIA,
} from "@/services/pokemon/statsGO";

/** "Nv. 20 · Raid e Ovo" — reaproveita o mesmo texto de contexto usado na
 *  Caçada (PokemonHundos), não uma legenda nova e solta. */
function legendaNivel(nivel: number): string {
  const contexto = NIVEIS_REFERENCIA.find((item) => item.nivel === nivel)?.contexto;
  return contexto ? `Nv. ${nivel} · ${contexto}` : `Nv. ${nivel}`;
}

type PokemonPocketCardProps = {
  pokemon: Pokemon;
};

/** Versão enxuta do card do Pokémon: só o essencial pra bater o olho — sem
 *  as seções de curadoria/decisão/megas da ficha completa (ver PokemonCard).
 *  No mobile tudo centraliza; a partir de `sm` volta pro layout em colunas. */
export function PokemonPocketCard({ pokemon }: PokemonPocketCardProps) {
  const {
    mostrarShiny,
    setMostrarShiny,
    mostrarMega,
    setMostrarMega,
    temShiny,
    temMega,
    imagensExibidas,
  } = useMegaShiny(pokemon);

  const { fraquezas } = calcularDerivados(pokemon.oficial.tipos);
  const hundos = calcularHundosPorNumero(pokemon.oficial.numero);
  const nome = pokemon.oficial.nome.ptBR || "Pokémon";

  return (
    <Card className="grid gap-4 sm:grid-cols-[minmax(96px,max-content)_1fr]">
      <div className="flex flex-nowrap items-center justify-center gap-3 sm:justify-start">
        {imagensExibidas.map((imagem) => (
          <div key={imagem.key} className="flex flex-col items-center gap-1">
            {imagem.src ? (
              <div className="relative h-[96px] w-[96px]">
                <Image
                  src={imagem.src}
                  alt={imagem.alt}
                  fill
                  sizes="96px"
                  className="object-contain"
                  style={
                    imagem.escala ? { transform: `scale(${imagem.escala})` } : undefined
                  }
                />
              </div>
            ) : (
              <div className="flex h-[96px] w-[96px] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted text-center text-xs text-muted-foreground">
                Sem imagem
              </div>
            )}

            {imagem.legenda && (
              <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {imagem.legenda}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="min-w-0 space-y-3">
        <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              {pokemon.oficial.numero || "#000"}
            </p>
            <h2 className="text-xl font-bold">{nome}</h2>

            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {pokemon.oficial.tipos.map((tipo) => (
                <TypeIcon
                  key={tipo}
                  tipo={tipo}
                  className="bg-secondary"
                  compact
                  mostrarNome
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-end">
            {(temShiny || temMega) && (
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
                {temShiny && (
                  <ToggleChip
                    ativo={mostrarShiny}
                    onClick={() => setMostrarShiny((valor) => !valor)}
                  >
                    ✨ Shiny
                  </ToggleChip>
                )}

                {temMega && (
                  <ToggleChip
                    ativo={mostrarMega}
                    onClick={() => setMostrarMega((valor) => !valor)}
                  >
                    💠 Mega
                  </ToggleChip>
                )}
              </div>
            )}

            {hundos && (
              <div className="flex flex-wrap items-start justify-center gap-2 sm:justify-end">
                <div className="flex flex-col items-center gap-0.5">
                  <span
                    title="CP 100% sem clima · nível 20"
                    className="rounded-full border border-border px-3 py-1.5 text-[21px] font-bold text-foreground"
                  >
                    ☁️ {hundos.semClima}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {legendaNivel(20)}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <span
                    title="CP 100% com clima · nível 25"
                    className="rounded-full border border-border px-3 py-1.5 text-[21px] font-bold text-foreground"
                  >
                    ☀️ {hundos.comClima}
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {legendaNivel(25)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            🔴 Fraco contra
          </p>

          {fraquezas.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
              {fraquezas.map((tipo) => (
                <TypeIcon
                  key={tipo}
                  tipo={tipo}
                  className="bg-bad"
                  compact
                  mostrarNome
                />
              ))}
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">Nenhuma</span>
          )}
        </div>
      </div>
    </Card>
  );
}
