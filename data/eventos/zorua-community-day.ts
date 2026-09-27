import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/october-communityday2026/ e
 * pokemongo.com/en/news/communityday-october-2026-zorua (confirmado
 * 27/09/2026). Taxa de shiny (1/20) vem de fontes agregadoras que citam a
 * taxa padrão de Community Day — o post oficial só diz "if you're lucky,
 * you might encounter a Shiny one", sem confirmar o número.
 */
export const zoruaCommunityDay: Evento = {
  slug: "zorua-community-day",
  titulo: "Community Day: Zorua",
  periodo: {
    inicio: "2026-10-10T14:00:00-03:00",
    fim: "2026-10-10T21:00:00-03:00",
  },
  periodoTexto: "10/10 (sáb) 14h → 21h de 2026 (horário local, bônus extra até 21h)",
  tema: "comunidade",
  badge: "Evolua até 4h depois pra Zoroark com Sucker Punch exclusivo",
  encontros: [
    {
      nome: "Zorua",
      tipos: ["Dark"],
      nota: "Não mostra a forma verdadeira no mapa (copia seu Buddy) até ser capturado — chance de shiny.",
      shiny: true,
    },
  ],
  notaCuradoria: {
    texto:
      "Sombrio já está \"excelente\" no plano (titular Hydreigon 3764) — Zoroark entra mais pela novidade (shiny, golpe exclusivo) do que reforço de bolsa. Bônus do bloco principal (14h–17h): 3× XP e 2× Doce em capturas, com chance dobrada de Doce Raro XL pra nível 31+, e Incenso dura 3h. Bônus estendido até 21h: Módulo Chamariz dura 1h, +1 Troca Especial (máx. 2 no dia) e 50% menos Pó Estelar em trocas.",
    linkPlano: true,
  },
};
