import type { Dispatch, SetStateAction } from "react";
import type { Pokemon } from "@/models/pokemon";

import {
  REGIOES,
  TIERS,
} from "@/constants/pokemon";

import { TextField } from "@/components/admin/TextField";
import { SelectField } from "@/components/admin/SelectField";

type PokemonFormProps = {
  pokemon: Pokemon;
  setPokemon: Dispatch<SetStateAction<Pokemon>>;
};

export function PokemonForm({
  pokemon,
  setPokemon,
}: PokemonFormProps) {

  function updatePokemon<K extends keyof Pokemon>(
    field: K,
    value: Pokemon[K]
  ) {
    setPokemon({
      ...pokemon,
      [field]: value,
    });
  }

  return (
    <section className="rounded-xl border p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Dados do Pokémon
      </h2>

      <div className="space-y-6">

        <div>

          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Identificação
          </h3>

          <div className="space-y-4">

            <TextField
              label="Nome"
              value={pokemon.nome}
              onChange={(nome) =>
                updatePokemon("nome", nome)
              }
            />

            <TextField
              label="Número"
              value={pokemon.numero}
              onChange={(numero) =>
                updatePokemon("numero", numero)
              }
            />

            <SelectField
              label="Região"
              value={pokemon.regiao}
              options={REGIOES}
              onChange={(regiao) =>
                updatePokemon("regiao", regiao)
              }
            />

            <TextField
              label="Imagem"
              value={pokemon.imagem}
              onChange={(imagem) =>
                updatePokemon("imagem", imagem)
              }
            />

          </div>

        </div>

        <div>

          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Avaliação
          </h3>

          <div className="space-y-4">

            <SelectField
              label="Tier"
              value={pokemon.tier}
              options={TIERS}
              onChange={(tier) =>
                updatePokemon(
                  "tier",
                  tier as Pokemon["tier"]
                )
              }
            />

          </div>

        </div>

        <div>

          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Hundos
          </h3>

          <div className="space-y-4">

            <TextField
              label="Raid N20"
              type="number"
              value={String(pokemon.hundos.raidNivel20)}
              onChange={(valor) =>
                setPokemon({
                  ...pokemon,
                  hundos: {
                    ...pokemon.hundos,
                    raidNivel20: Number(valor),
                  },
                })
              }
            />

            <TextField
              label="Raid N25"
              type="number"
              value={String(pokemon.hundos.raidNivel25)}
              onChange={(valor) =>
                setPokemon({
                  ...pokemon,
                  hundos: {
                    ...pokemon.hundos,
                    raidNivel25: Number(valor),
                  },
                })
              }
            />

            <TextField
              label="98%"
              type="number"
              value={String(pokemon.quaseHundos.iv98)}
              onChange={(valor) =>
                setPokemon({
                  ...pokemon,
                  quaseHundos: {
                    ...pokemon.quaseHundos,
                    iv98: Number(valor),
                  },
                })
              }
            />

            <TextField
              label="96%"
              type="number"
              value={String(pokemon.quaseHundos.iv96)}
              onChange={(valor) =>
                setPokemon({
                  ...pokemon,
                  quaseHundos: {
                    ...pokemon.quaseHundos,
                    iv96: Number(valor),
                  },
                })
              }
            />

          </div>

        </div>

      </div>

    </section>
  );
}