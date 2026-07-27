import type { Pokemon, TipoPokemon } from "@/models/pokemon";
import { SectionCard } from "@/components/ui/SectionCard";
import { TypeIcon } from "@/components/ui/TypeIcon";
import { calcularDerivados } from "@/services/pokemon/calcularDerivados";

type PokemonCombatProps = {
  pokemon: Pokemon;
};

type GrupoTiposProps = {
  titulo: string;
  tipos: TipoPokemon[];
  corTitulo: string;
  corChip: string;
  borda?: boolean;
};

function GrupoTipos({
  titulo,
  tipos,
  corTitulo,
  corChip,
  borda = false,
}: GrupoTiposProps) {
  return (
    <div className={borda ? "border-l border-border pl-4" : undefined}>
      <h3 className={`mb-2 font-medium ${corTitulo}`}>{titulo}</h3>

      {tipos.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {tipos.map((tipo) => (
            // No Combate o nome do tipo fica sempre visível ao lado do ícone.
            <TypeIcon key={tipo} tipo={tipo} className={corChip} mostrarNome />
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      )}
    </div>
  );
}

export function PokemonCombat({ pokemon }: PokemonCombatProps) {
  const { fortesContra, fraquezas, resistencias, imunidades } =
    calcularDerivados(pokemon.oficial.tipos);

  return (
    <SectionCard title="Combate">
      <div className="space-y-5">
        {/* Ataque — contra quem os golpes dele são fortes (foco de raid/ginásio) */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            ⚔️ Atacando
          </p>

          <GrupoTipos
            titulo="🟢 Bom contra"
            tipos={fortesContra}
            corTitulo="text-good-foreground"
            corChip="bg-good"
          />
        </div>

        {/* Defesa — dano que ele RECEBE enquanto ataca */}
        <div className="border-t border-border pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            🛡️ Defendendo
          </p>

          <div className="grid grid-cols-2 gap-4">
            <GrupoTipos
              titulo="🔴 Fraco a"
              tipos={fraquezas}
              corTitulo="text-bad-foreground"
              corChip="bg-bad"
            />
            <GrupoTipos
              titulo="🟢 Resiste a"
              tipos={[...resistencias, ...imunidades]}
              corTitulo="text-good-foreground"
              corChip="bg-good"
              borda
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
