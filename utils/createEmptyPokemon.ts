import { Pokemon } from "@/models/pokemon";

export function createEmptyPokemon(): Pokemon {
  return {
    // Identificação
    numero: "",
    nome: "",
    regiao: "",
    imagem: "",

    // Classificação
    tier: "C",
    funcao: "Versátil",
    melhorPara: [],
    climasFavoraveis: [],

    // Combate
    tipos: [],
    fraquezas: [],
    resistencias: [],

    // Investimento
    formaEspecial: {
      tipo: "Nenhuma",
      nome: "",
      valeInvestir: false,
      motivo: "",
    },

    shadow: {
      possuiShadow: false,
      recomendadoPurificar: false,
    },

    buddy: {
      necessario: false,
      objetivo: "",
    },

    evolucao: {
      anteriores: [],
      proximas: [],
    },

    formas:[],

    // Estatísticas
    hundos: {
      semClima: 0,
      comClima: 0,
    },

    quaseHundos: {
      iv98: 0,
      iv96: 0,
    },

    // Conhecimento
    decisoes: [],

    observacoes: [],

    // Sinergias
    sinergias: [],
  };
}