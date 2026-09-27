import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/world-space-week-2026 e
 * pokemongo.com/en/news/world-space-week-2026 (confirmado 27/09/2026) —
 * colaboração com a Semana Mundial do Espaço (ESA). Pikachu Astronauta não
 * está no roster de Megas nem no CDN de ícones (pokemon-go-api/assets) —
 * fantasia nova demais. Imagem recortada manualmente a partir do banner
 * oficial do evento (pokemongo.com/en/news/world-space-week-2026) e salva
 * em public/eventos/, só pra indicar a fantasia — não é um sprite de jogo.
 * Sem CP por ser reide de 1 estrela (não tem CP relevante pro plano).
 */
export const worldSpaceWeek: Evento = {
  slug: "world-space-week",
  titulo: "Semana Mundial do Espaço",
  periodo: {
    inicio: "2026-10-04T00:00:00-03:00",
    fim: "2026-10-10T23:59:00-03:00",
  },
  periodoTexto: "Domingo, 04/10 a 00h até Sábado, 10/10 às 23h59 (horário local)",
  tema: "psiquico",
  badge: "Estreia do Pikachu Astronauta — reide 1 estrela + pesquisa grátis",
  reides: [
    {
      nivel: "Reides 1 estrela (04→10/10)",
      chefes: [
        {
          nome: "Pikachu Astronauta",
          tipos: ["Electric"],
          imagem: "/eventos/pikachu-astronauta.jpg",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Nada essencial pro plano — Pikachu (mesmo de fantasia) não compete com nada relevante de Elétrico por causa dos stats baixos. É um evento de colecionador/shiny, ligado à Semana Mundial do Espaço (parceria com a ESA): o encontro sai de reide 1 estrela ou de Pesquisa Cronometrada grátis (tarefas precisam ser concluídas e recompensas resgatadas até 12/10 23h59), com chance de shiny nos dois.",
  },
};
