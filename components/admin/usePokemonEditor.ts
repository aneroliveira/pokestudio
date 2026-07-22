import type { Dispatch, SetStateAction } from "react";
import type {
  DecisaoPokemon,
  Pokemon,
  StatusDecisao,
} from "@/models/pokemon";

/**
 * Helpers imutáveis de edição do Pokémon, compartilhados entre as abas
 * do Admin. Cada helper atualiza apenas o seu domínio, preservando o
 * restante da composição (oficial / studio).
 */
export function usePokemonEditor(
  setPokemon: Dispatch<SetStateAction<Pokemon>>,
) {
  function updateEstrategia<
    K extends keyof Pokemon["studio"]["estrategia"],
  >(field: K, value: Pokemon["studio"]["estrategia"][K]) {
    setPokemon((c) => ({
      ...c,
      studio: {
        ...c.studio,
        estrategia: { ...c.studio.estrategia, [field]: value },
      },
    }));
  }

  function updateConhecimento<
    K extends keyof Pokemon["studio"]["conhecimento"],
  >(field: K, value: Pokemon["studio"]["conhecimento"][K]) {
    setPokemon((c) => ({
      ...c,
      studio: {
        ...c.studio,
        conhecimento: { ...c.studio.conhecimento, [field]: value },
      },
    }));
  }

  function updateEstado<
    K extends keyof Pokemon["studio"]["go"]["estado"],
  >(field: K, value: Pokemon["studio"]["go"]["estado"][K]) {
    setPokemon((c) => ({
      ...c,
      studio: {
        ...c.studio,
        go: {
          ...c.studio.go,
          estado: { ...c.studio.go.estado, [field]: value },
        },
      },
    }));
  }

  function updateShadow<
    K extends keyof Pokemon["studio"]["go"]["shadow"],
  >(field: K, value: Pokemon["studio"]["go"]["shadow"][K]) {
    setPokemon((c) => ({
      ...c,
      studio: {
        ...c.studio,
        go: {
          ...c.studio.go,
          shadow: { ...c.studio.go.shadow, [field]: value },
        },
      },
    }));
  }

  function updateBuddy<
    K extends keyof Pokemon["studio"]["go"]["buddy"],
  >(field: K, value: Pokemon["studio"]["go"]["buddy"][K]) {
    setPokemon((c) => ({
      ...c,
      studio: {
        ...c.studio,
        go: {
          ...c.studio.go,
          buddy: { ...c.studio.go.buddy, [field]: value },
        },
      },
    }));
  }

  function updateHundos<
    K extends keyof Pokemon["studio"]["go"]["hundos"],
  >(field: K, value: Pokemon["studio"]["go"]["hundos"][K]) {
    setPokemon((c) => ({
      ...c,
      studio: {
        ...c.studio,
        go: {
          ...c.studio.go,
          hundos: { ...c.studio.go.hundos, [field]: value },
        },
      },
    }));
  }

  function updateQuaseHundos<
    K extends keyof Pokemon["studio"]["go"]["quaseHundos"],
  >(field: K, value: Pokemon["studio"]["go"]["quaseHundos"][K]) {
    setPokemon((c) => ({
      ...c,
      studio: {
        ...c.studio,
        go: {
          ...c.studio.go,
          quaseHundos: { ...c.studio.go.quaseHundos, [field]: value },
        },
      },
    }));
  }

  function updateDecision(title: string, status: StatusDecisao) {
    setPokemon((c) => {
      const decisoes = c.studio.conhecimento.decisoes;
      const existing = decisoes.find((item) => item.titulo === title);
      const decisao: DecisaoPokemon = { titulo: title, status };

      return {
        ...c,
        studio: {
          ...c.studio,
          conhecimento: {
            ...c.studio.conhecimento,
            decisoes: existing
              ? decisoes.map((item) =>
                item.titulo === title ? decisao : item,
              )
              : [...decisoes, decisao],
          },
        },
      };
    });
  }

  return {
    updateEstrategia,
    updateConhecimento,
    updateEstado,
    updateShadow,
    updateBuddy,
    updateHundos,
    updateQuaseHundos,
    updateDecision,
  };
}

export type PokemonEditor = ReturnType<typeof usePokemonEditor>;
