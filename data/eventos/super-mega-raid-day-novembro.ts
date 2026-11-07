import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/clefable-super-mega-raid-day-2026
 * (confirmado 06/11/2026). Estreia do Mega Clefable, já com nível Super Max
 * e o golpe novo Explosão Lunar+. O post não diz o tipo da Mega — assumo
 * Fada, o do Clefable. Mega Clefable ainda não está no roster de Megas (nem
 * o CDN tem o ícone da Mega) — usa o sprite base do Clefable. Slug mantido
 * de quando o chefe ainda não tinha sido anunciado, pra não quebrar link.
 */
export const superMegaRaidDayNovembro: Evento = {
  slug: "super-mega-raid-day-novembro",
  titulo: "Dia de Super Megarreides: Clefable",
  periodo: {
    inicio: "2026-11-28T14:00:00-03:00",
    fim: "2026-11-28T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 28/11, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Estreia: Mega Clefable",
  estreias: {
    lista: [
      {
        nome: "Mega Clefable",
        tipos: ["Fairy"],
        origem: "Estreia no jogo em Super Megarreides, com mais chance de Clefable brilhante.",
      },
    ],
    dica: "Golpe novo: Explosão Lunar+ (160 de poder em reide, cresce com o Meganível). Mega Clefable já pode chegar ao nível Super Max: Meganível Máx. + Megaenergia do Clefable.",
  },
  reides: [
    {
      nivel: "Super Megarreides (28/11, 14h–17h)",
      chefes: [
        {
          nome: "Mega Clefable",
          tipos: ["Fairy"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm36.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: Fada está \"subnivelado\" no plano (Enamorus 2387 → Togekiss 2328 → Gardevoir 2298), e um Mega Clefable com Explosão Lunar+ vira uma Mega de Fada de verdade. Clefable capturado aqui já vem com Meganível 1. Grátis: até 6 Passes de Reide nos Ginásios e Reide Remota até 20 (27/11 às 22h → 29/11 à 1h, Brasília). Pesquisa temporária grátis: Passe de Reide Premium e um Metagross. Ingresso (US$4,99): até 14 passes, +5.000 PE e +5.000 Poeira por Super Megarreide e mais chance de Doce Raro GG. Desafio Global (27–28/11) dá bônus de poder à Explosão Lunar+ de 30/11 a 13/12. Cai no meio da semana do Mega Metagross + Deoxys e dos Chamados do Crepúsculo.",
    linkPlano: true,
  },
};
