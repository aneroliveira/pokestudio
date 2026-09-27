import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/gigantamax-cinderace-max-battle-day-2026 e
 * pokemongo.com/en/news/gigantamax-cinderace-max-battle-day-2026 (confirmado
 * 27/09/2026) — evento oficial próprio, com bônus específicos de Batalhas
 * Max (não é parte do "Festival da Colheita: Rocket Assume o Controle",
 * mesmo caindo dentro da janela dele). G-Cinderace não está no roster de
 * Megas — usa sprite curado manualmente (forma Gigantamax, `.fGIGANTAMAX`),
 * sem CP por falta de fonte confirmada.
 */
export const gigantamaxCinderaceMaxBattleDay: Evento = {
  slug: "gigantamax-cinderace-max-battle-day",
  titulo: "Gigantamax Cinderace: Dia de Batalhas Max",
  periodo: {
    inicio: "2026-10-03T14:00:00-03:00",
    fim: "2026-10-03T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 03/10, das 14h às 17h (horário local)",
  tema: "mega",
  badge: "Estreia shiny do Gigantamax Cinderace",
  reides: [
    {
      nivel: "Batalhas Max — todos os Marcos de Energia (03/10, 14h–17h)",
      chefes: [
        {
          nome: "G-Cinderace",
          tipos: ["Fire"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm815.fGIGANTAMAX.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Fogo já está \"pronto\" no plano (titular Chandelure 3175) — G-Cinderace entra mais pela estreia shiny do que por reforço de bolsa. Bônus do dia: limite de Partículas Max sobe pra 1600, Marcos de Energia atualizam mais rápido e rendem 8× partículas, e dá pra fazer até 3 Trocas Especiais. Ingresso pago (US$4,99) libera Pesquisa Cronometrada exclusiva com Cogumelo Max e XP extra em Batalhas Max.",
    linkPlano: true,
  },
};
