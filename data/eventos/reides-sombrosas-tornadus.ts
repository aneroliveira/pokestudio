import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/shadow-tornadus-incarnate-forme-in-shadow-raids-november-4-2026
 * e leekduck.com/events/shadow-tornadus-incarnate-forme-in-shadow-raids-november-16-2026
 * (confirmado 21/10/2026) — reides sombrosas de 5 estrelas "todo fim de
 * semana" em duas janelas: 04/11 → 08/11 (fim de semana 07–08/11) e 16/11
 * → 01/12 (21–22/11 e 28–29/11). O fim de semana de 14–15/11 fica de fora
 * (é o da Área Selvagem Global). O Leek Duck diz 22h no fim; mantenho 21h
 * seguindo a correção dos cards anteriores. Shiny não mencionado. Tornadus
 * não está no roster de Megas — sprite curado manualmente (`.fINCARNATE`).
 */
export const reidesSombrosasTornadus: Evento = {
  slug: "reides-sombrosas-tornadus",
  titulo: "Reides Sombrosas: Tornadus",
  periodo: {
    inicio: "2026-11-04T06:00:00-03:00",
    fim: "2026-12-01T21:00:00-03:00",
  },
  periodoTexto: "Fins de semana de 07–08/11, 21–22/11 e 28–29/11 (horário local)",
  tema: "sombrio",
  badge: "Só aos fins de semana",
  reides: [
    {
      nivel: "Reides Sombrosas de 5 estrelas (07–08/11, 21–22/11 e 28–29/11)",
      chefes: [
        {
          nome: "Tornadus Sombroso (Materializado)",
          tipos: ["Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm641.fINCARNATE.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Prioridade alta: Voador está \"baixa\" no plano (titular Braviary 1732, só Honchkrow 2161 na reserva), e Tornadus Sombroso é um dos melhores atacantes de Voador do jogo — são três fins de semana pra montar um time. Reide sombrosa precisa de Cristal Púrpura pra acalmar o chefe.",
    linkPlano: true,
  },
};
