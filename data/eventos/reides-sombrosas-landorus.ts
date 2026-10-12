import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/shadow-landorus-incarnate-forme-in-shadow-raids-october-2026
 * (confirmado 12/10/2026) — reides sombrosas de 5 estrelas "todo fim de
 * semana" de 07/10 6h a 03/11. O Leek Duck diz 22h no fim; mantenho 21h
 * seguindo a correção dos cards anteriores. Landorus não está no roster de
 * Megas — usa sprite curado manualmente (forma Materializada,
 * `.fINCARNATE`).
 */
export const reidesSombrosasLandorus: Evento = {
  slug: "reides-sombrosas-landorus",
  titulo: "Reides Sombrosas: Landorus",
  periodo: {
    inicio: "2026-10-07T06:00:00-03:00",
    fim: "2026-11-03T21:00:00-03:00",
  },
  periodoTexto: "Fins de semana de 07/10 a 03/11 (horário local)",
  tema: "sombrio",
  badge: "Só aos fins de semana",
  reides: [
    {
      nivel: "Reides Sombrosas de 5 estrelas (fins de semana, 07/10 → 03/11)",
      chefes: [
        {
          nome: "Landorus Sombroso (Materializado)",
          tipos: ["Ground", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm645.fINCARNATE.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Terrestre já está \"pronto\" no plano (Rhyperior 3653 → Garchomp 2915), com Landorus 2223 na reserva. A versão sombrosa bate bem mais forte — interessante se sobrar Passe de Reide no fim de semana, mas não é urgente. Reide sombrosa precisa de Cristal Púrpura pra acalmar o chefe.",
    linkPlano: true,
  },
};
