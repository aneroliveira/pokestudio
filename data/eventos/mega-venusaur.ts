import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena (rotação semanal
 * de Mega Raids, início às 5h). Inclui o "Dia de Super Mega Reides"
 * (19/09, sáb, 14h–17h) com Mega Staraptor — confirmado pela Lorena via
 * post do Instagram (@jogadaexcelente, 25/08). Staraptor não está no
 * roster de Megas do site (data/megas.json), e não existe sprite oficial
 * da forma Mega (URL testada deu 404 — provavelmente porque essa Mega não
 * existe em nenhum jogo da série principal). Usa o ícone do Staraptor
 * base como aproximação visual, já que é melhor que nenhuma imagem — mas
 * não é o sprite real do chefe. Sem CP curado.
 *
 * Sobre o tie-in "Pokémon Horizontes": o post do Instagram indicado pela
 * Lorena (@pokemongoappbr, 02/09) ficou bloqueado atrás do login do
 * Instagram — só deu pra ver um trecho truncado da legenda mencionando
 * "Pokémon fantasiados" num evento de celebração do anime. Sem lista de
 * Pokémon, bônus ou datas específicas confirmadas — fica como nota "a
 * confirmar" até a Lorena trazer os detalhes.
 */
export const megaVenusaur: Evento = {
  slug: "mega-venusaur",
  titulo: "Mega Venusaur",
  periodo: {
    inicio: "2026-09-16T05:00:00-03:00",
    fim: "2026-09-22T05:00:00-03:00",
  },
  periodoTexto: "16/09 (qua) 5h → 22/09 (ter) 5h de 2026 (horário local)",
  tema: "mega",
  badge: "Tie-in temático: Pokémon Horizontes (detalhes a confirmar)",
  reides: [
    {
      nivel: "Mega Raids (16→22/09)",
      chefes: [{ nome: "Mega Venusaur", tipos: ["Grass", "Poison"] }],
    },
    {
      nivel: "Dia de Super Mega Reides (19/09, 14h–17h)",
      chefes: [
        {
          nome: "Mega Staraptor",
          tipos: ["Normal", "Flying"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm398.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto: [
      "Planta está \"baixa\" no plano (titular Chesnaught 2533 → Venusaur 2720) — Mega Venusaur é prioridade real da semana, não só mais uma Mega Energia.",
      "",
      "O Dia de Super Mega Reides do dia 19 (14h–17h) traz Mega Staraptor de bônus — Voador também está \"baixa\" no plano (titular Braviary 1732, só uma reserva), então vale encaixar esse reide na janela das 14h–17h.",
      "",
      "Pokémon Horizontes ainda está com conteúdo jogável a confirmar — atualizo assim que tiver a lista de Pokémon fantasiados e bônus.",
    ].join("\n"),
    linkPlano: true,
  },
};
