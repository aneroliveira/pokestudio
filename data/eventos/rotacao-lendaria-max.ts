import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena. Une duas linhas
 * do calendário que caem na mesma semana: a rotação de Dynamax das aves
 * lendárias (21→27/09, iniciando com a Segunda Max do dia 21, 6h–21h) e a
 * Hora Lendária das Ultra Bestas (23/09, 18h–19h). Nenhum dos chefes está
 * no roster de Megas — cards renderizam com ícones de tipo, sem sprite/CP
 * curados.
 */
export const rotacaoLendariaMax: Evento = {
  slug: "rotacao-lendaria-max",
  titulo: "Rotação Lendária Max",
  periodo: {
    inicio: "2026-09-21T06:00:00-03:00",
    fim: "2026-09-27T21:00:00-03:00",
  },
  periodoTexto: "21/09 (seg) 6h → 27/09 (dom) 21h de 2026 (horário local)",
  tema: "lendario",
  badge: "Segunda Max: aves lendárias em Dynamax, 21/09 6h–21h",
  reides: [
    {
      nivel: "Dynamax — aves lendárias (21→27/09)",
      chefes: [
        { nome: "Articuno", tipos: ["Ice", "Flying"] },
        { nome: "Zapdos", tipos: ["Electric", "Flying"] },
        { nome: "Moltres", tipos: ["Fire", "Flying"] },
      ],
    },
    {
      nivel: "Hora Lendária — Ultra Bestas (23/09, 18h–19h)",
      chefes: [
        { nome: "Xurkitree", tipos: ["Electric"] },
        { nome: "Buzzwole", tipos: ["Fighting"] },
        { nome: "Pheromosa", tipos: ["Bug", "Fighting"] },
      ],
    },
  ],
  notaCuradoria: {
    texto: [
      "Semana mais importante do mês pro plano: Elétrico está em \"buraco\" (só o Regieleki 1563 segurando as pontas) — Zapdos e Xurkitree são os upgrades mais diretos do calendário inteiro.",
      "",
      "Gelo está \"magro\" (titular Baxcalibur, reservas travadas nos Kyurem bloqueados) — Articuno ajuda a destravar essa lacuna. Voador também está \"baixa\", e as três aves reforçam isso de quebra.",
      "",
      "Das Ultra Bestas: Buzzwole já é reserva de Lutador (2451), mas Pheromosa reforça Inseto (\"baixa\") e Lutador ao mesmo tempo — prioridade alta se aparecer com bom IV.",
    ].join("\n"),
    linkPlano: true,
  },
};
