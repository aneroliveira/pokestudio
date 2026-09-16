import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/en/news/city-safaris-europe-2026 e
 * dittobase.com/pokemon-go/events/pokemon-go-city-safari-2026-rio-de-janeiro
 * (confirmado 16/09/2026) — o Rio de Janeiro é uma das cidades-sede de
 * 2026! Evento presencial com ingresso pago, não joga em casa.
 */
export const citySafari: Evento = {
  slug: "city-safari",
  titulo: "Pokémon GO City Safari: Rio de Janeiro",
  periodo: {
    inicio: "2026-09-26T10:00:00-03:00",
    fim: "2026-09-27T18:00:00-03:00",
  },
  periodoTexto: "26/09 (sáb) e 27/09 (dom), 10h → 18h cada dia (horário de Brasília)",
  tema: "comunidade",
  badge: "Presencial no Rio de Janeiro — ingresso R$38/dia",
  estreias: {
    lista: [
      {
        nome: "Mudbray",
        tipos: ["Ground"],
        origem:
          "Exclusivo dos eventos City Safari 2026 — pode chegar ao mundo todo depois, mas por enquanto só aqui.",
      },
    ],
  },
  notaCuradoria: {
    texto:
      "Evento presencial e pago (R$38/dia, com adicionais \"Raid Lover\" e \"Egg-thusiast\" a R$23 cada) — só vale a pena se você for estar no Rio nesse fim de semana. Traz Pesquisa Especial exclusiva, Mudbray (só sai daqui por enquanto) e o GO Stamp Rally: até 8 carimbos por dia em PokéStops marcadas, cada um dando um encontro com Eevee de chapéu de explorador (evolui em 8 formas fantasiadas diferentes).",
  },
};
