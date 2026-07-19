import { Pokemon } from "@/models/pokemon";

export function createEmptyPokemon(): Pokemon {
  return {
    // Identificação
    numero: "",
    regiao: "",
    imagem: "",
    nome: {
      "ptBR": "",
      "enUS": ""
    },
    "movepool": {
      "rapidos": [],
      "carregados": []
    },

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
    estadoGO: {
      tipo: "Nenhum",
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

    formas: [],

    movimentos: {
      rapidos: [],
      carregados: [],
    },

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