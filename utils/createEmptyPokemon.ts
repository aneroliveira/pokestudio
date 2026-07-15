import type { Pokemon } from "@/models/pokemon";

export function createEmptyPokemon(): Pokemon {
  return {
    id: 0,
    numero: "",
    nome: "",
    regiao: "",
    tipos: [],
    tier: "C",
    funcao: "Atacante",
    descricao: "",
    imagem: "",
    climaFavoravel: "Ensolarado",

    uso: {
      raid: false,
      rocket: false,
      ginasio: false,
      pvp: false,
    },

    hundos: {
      raidNivel20: 0,
      raidNivel25: 0,
    },

    quaseHundos: {
      iv98: 0,
      iv96: 0,
    },

    decisoes: [],

    fraquezas: [],

    resistencias: [],

    melhoresMegas: [],

    evolucao: {
      possui: false,
    },

    mega: {
      possui: false,
    },

    shadow: {
      possuiShadow: false,
      recomendadoPurificar: false,
    },

    buddy: {
      necessario: false,
    },

    observacoes: [],
  };
}