import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/dynamax-uxie-mesprit-azelf-max-battle-day-2026
 * e a página "save the date" oficial (pokemongo.com/pt-BR/news/save-the-date-s24),
 * que lista o Dia de Batalhas Max de 24/10 (confirmado 12/10/2026). O trio
 * é regional: nas Américas (Brasil incluso) só aparece o Azelf. Sprite
 * curado manualmente — Azelf não está no roster de Megas.
 */
export const trioDoLagoMaxBattleDay: Evento = {
  slug: "trio-do-lago-max-battle-day",
  titulo: "Dia de Batalhas Max: Azelf Dinamax",
  periodo: {
    inicio: "2026-10-24T14:00:00-03:00",
    fim: "2026-10-24T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 24/10, das 14h às 17h (horário local)",
  tema: "psiquico",
  badge: "No Brasil, só Azelf (Uxie e Mesprit são de outras regiões)",
  reides: [
    {
      nivel: "Batalhas Max de 5 estrelas — Américas (24/10, 14h–17h)",
      chefes: [
        {
          nome: "Azelf Dinamax",
          tipos: ["Psychic"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm482.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Psíquico já está \"excelente\" no plano (Mewtwo X 4724 → Espeon) — Azelf entra mais pelo shiny e pela coleção Dinamax. Bônus das 14h às 17h: limite de Partículas Max sobe pra 1600, todos os Marcos de Energia têm Batalhas Dinamax, 8× partículas dos Marcos e até 3 Trocas Especiais. Das 0h às 17h: 2× partículas explorando. Limite de Reide Remota sobe de 10 pra 20 (23/10 → 24/10). Ingresso pago (US$4,99) dá Cogumelo Max, 25.000 XP, 6.400 partículas e 2× XP em Batalhas Max.",
    linkPlano: true,
  },
};
