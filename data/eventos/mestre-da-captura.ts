import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/catch-mastery-phantump-2026 e
 * pokemongo.com/en/news/catch-mastery-phantump-2026 (confirmado
 * 16/09/2026) — nome oficial "Catch Mastery: Phantump". Horário corrigido
 * pra 10h→20h (antes eu tinha só até 17h).
 */
export const mestreDaCaptura: Evento = {
  slug: "mestre-da-captura",
  titulo: "Mestre da Captura: Phantump",
  periodo: {
    inicio: "2026-09-26T10:00:00-03:00",
    fim: "2026-09-26T20:00:00-03:00",
  },
  periodoTexto: "26/09 (sáb) 10h → 20h de 2026 (horário local)",
  tema: "comunidade",
  badge: "Chance elevada de Phantump, Cherubi e Drifloon shiny",
  encontros: [
    {
      nome: "Phantump",
      tipos: ["Ghost", "Grass"],
      nota: "Pesquisa de campo, pesquisa cronometrada grátis e paga — chance elevada de shiny.",
      shiny: true,
    },
    {
      nome: "Cherubi",
      tipos: ["Grass"],
      nota: "Aparece mais na natureza durante o evento — chance elevada de shiny.",
      shiny: true,
    },
    {
      nome: "Drifloon",
      tipos: ["Ghost", "Flying"],
      nota: "Aparece mais na natureza durante o evento — chance elevada de shiny.",
      shiny: true,
    },
  ],
  notaCuradoria: {
    texto:
      "Bônus: 2× XP em capturas com Arremesso Bom ou melhor, e mais doce por acerto. Caixa de Ingresso Ultra (US$1,99) dá o ingresso do evento + 2 Doces Raros. Nada essencial pro plano de reide — é mais um evento de captura/shiny do que de atacante novo.",
  },
};
