import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena. Janela mais
 * longa do mês (quase um mês inteiro) — Thundurus Sombroso (Forma
 * Materializada). Não está no roster de Megas; sprite usa a forma
 * Incarnate (`.fINCARNATE`), sem CP curado por falta de fonte confirmada.
 */
export const reidesSombrosasThundurus: Evento = {
  slug: "reides-sombrosas-thundurus",
  titulo: "Reides Sombrosas — Thundurus",
  periodo: {
    inicio: "2026-09-09T10:00:00-03:00",
    fim: "2026-10-06T10:00:00-03:00",
  },
  periodoTexto: "09/09 (qua) 10h → 06/10 (ter) 10h de 2026 (horário local)",
  tema: "sombrio",
  badge: "Thundurus Sombroso — Forma Materializada",
  reides: [
    {
      nivel: "Reides Sombrosas (09/09 → 06/10)",
      chefes: [
        {
          nome: "Thundurus Sombroso",
          tipos: ["Electric", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm642.fINCARNATE.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Provavelmente o destaque do mês pro plano: Elétrico está em \"buraco\" (só o Regieleki 1563 segurando as pontas), e sombroso soma +20% de ataque — um Thundurus Sombroso bem capturado pode virar o novo titular de Elétrico direto. Janela longa (quase um mês), dá pra tentar com calma até achar um bom IV.",
    linkPlano: true,
  },
};
