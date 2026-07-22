import { Pokemon } from "@/models/pokemon";

export function createEmptyPokemon(): Pokemon {
  return {
    oficial: {
      numero: "",
      nome: {
        ptBR: "",
        enUS: "",
      },
      regiao: "",
      imagem: "",
      tipos: [],
      evolucao: {
        anteriores: [],
        proximas: [],
      },
      formas: [],
      movepool: {
        rapidos: [],
        carregados: [],
      },
    },

    studio: {
      estrategia: {
        tier: "C",
        funcao: "Versátil",
        melhorPara: [],
      },
      conhecimento: {
        decisoes: [],
        observacoes: [],
        sinergias: [],
      },
      go: {
        estado: {
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
        hundos: {
          semClima: 0,
          comClima: 0,
        },
        quaseHundos: {
          iv98: 0,
          iv96: 0,
        },
      },
    },
  };
}
