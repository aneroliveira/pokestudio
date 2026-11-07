import type { Evento } from "@/models/evento";

/**
 * Fonte: pokemongo.com/pt_BR/news/gowildarea-2026-timed-research
 * (confirmado 06/11/2026) — pesquisa temporária grátis da Área Selvagem
 * GO. Só recebe quem fizer login de 06/11 10h a 08/11 23h59; dá pra
 * concluir e resgatar até 15/11 23h59. `periodo` cobre o prazo de
 * conclusão; o selo destaca a janela de login, que é o que não pode passar.
 */
export const pesquisaMachampGigamax: Evento = {
  slug: "pesquisa-machamp-gigamax",
  titulo: "Pesquisa grátis: Machamp Gigamax",
  periodo: {
    inicio: "2026-11-06T10:00:00-03:00",
    fim: "2026-11-15T23:59:00-03:00",
  },
  periodoTexto: "Login de Sexta, 06/11 às 10h até Domingo, 08/11 às 23h59 — concluir até 15/11 (horário local)",
  tema: "lendario",
  badge: "Faça login até domingo, 08/11, pra receber",
  reides: [
    {
      nivel: "Recompensa da pesquisa — encontro",
      chefes: [
        {
          nome: "Machamp Gigamax",
          tipos: ["Fighting"],
          imagem:
            "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon/pm68.fGIGANTAMAX.icon.png",
        },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Só abrir o jogo uma vez até domingo, 08/11, já garante a pesquisa. Recompensas: encontro com Machamp Gigamax (pode vir brilhante), Doces e Doces GG de Machop e Partículas Max. Machamp é a resposta de Lutador pro Duraludon Gigamax e o Dialga Dinamax da Área Selvagem Global (14–15/11) — e o Machop Dinamax da Natureza Selvagem (09–13/11) dá mais doce pra fortalecer.",
    linkPlano: true,
  },
};
