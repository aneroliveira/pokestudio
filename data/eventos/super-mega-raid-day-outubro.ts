import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/chandelure-super-mega-raid-day-2026 e
 * pokemongo.com/pt_BR/news/chandelure-super-mega-raid-day-2026 (confirmado
 * 18/10/2026). Estreia do Mega Chandelure, já com nível Super Max e o golpe
 * novo Vento Ominoso+. Mega Chandelure ainda não está no roster de Megas —
 * usa o sprite base do Chandelure curado manualmente.
 */
export const superMegaRaidDayOutubro: Evento = {
  slug: "super-mega-raid-day-outubro",
  titulo: "Dia de Super Megarreides: Chandelure",
  periodo: {
    inicio: "2026-10-31T14:00:00-03:00",
    fim: "2026-10-31T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 31/10, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Estreia: Mega Chandelure",
  estreias: {
    lista: [
      {
        nome: "Mega Chandelure",
        tipos: ["Ghost", "Fire"],
        origem: "Estreia no jogo em Super Megarreides, com mais chance de Chandelure brilhante.",
      },
    ],
    dica: "Golpe novo: Vento Ominoso+ (145 de poder em reide, cresce com o Mega Nível). Mega Chandelure já pode chegar ao nível Super Max: Mega Nível Máx. + Energia Mega do Chandelure.",
  },
  reides: [
    {
      nivel: "Super Megarreides (31/10, 14h–17h)",
      chefes: [
        {
          nome: "Mega Chandelure",
          tipos: ["Ghost", "Fire"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm609.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: o titular de Fogo da bolsa já é um Chandelure 3175, e a Mega dele é Fantasma/Fogo — reforça o Fantasma, \"subnivelado\" no plano (Lunala 2289 → Gengar 2049), na mesma semana da Giratina Origem. Chandelure capturado aqui já vem com Mega Nível 1. Grátis: até 6 Passes de Reide nos Ginásios e limite de Reide Remota 20 (30/10 → 31/10). Ingresso (US$4,99): até 14 passes, +5.000 XP e +5.000 Poeira por Super Megarreide, mais chance de Doce Raro XL. Desafio Global dá bônus de poder ao Vento Ominoso+ de 02/11 a 15/11.",
    linkPlano: true,
  },
};
