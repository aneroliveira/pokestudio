import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/sandile-hatch-day-2026 e a página "save the
 * date" oficial (pokemongo.com/pt-BR/news/save-the-date-s24), que lista o
 * Dia de Chocar de 17/10 (confirmado 12/10/2026).
 */
export const diaDeChocarSandile: Evento = {
  slug: "dia-de-chocar-sandile",
  titulo: "Dia de Chocar: Sandile",
  periodo: {
    inicio: "2026-10-17T11:00:00-03:00",
    fim: "2026-10-17T17:00:00-03:00",
  },
  periodoTexto: "Sábado, 17/10, das 11h às 17h (horário local)",
  tema: "comunidade",
  badge: "½ da distância pra chocar ovos",
  encontros: [
    {
      nome: "Sandile",
      tipos: ["Ground", "Dark"],
      nota: "Choca com mais frequência dos Ovos de 2 km, chance de shiny aumentada.",
      shiny: true,
    },
  ],
  notaCuradoria: {
    texto:
      "Bônus: 2× Doce ao chocar, metade da distância pra chocar e mais chance de ganhar Ovos de 2 km girando PokéStops — vale abrir espaço nos ovos antes. Pesquisa Cronometrada grátis dá Incubadora e XP; o ingresso pago (US$1,99) baixa a distância pra ¼ e dá 2 Super Incubadoras. Tudo precisa ser resgatado até 17h. Evento de captura/coleção — nada essencial pro plano de reide.",
  },
};
