import type { Evento } from "@/models/evento";

/**
 * Fontes: leekduck.com/events/mega-ascension/ e
 * pokemongohub.net/post/event/mega-ascension (confirmam período, elenco de
 * Mega Raids e bônus de Passe de Reide Remoto). É o aquecimento pro GO Fest
 * 2026: Mega Finale — ver gofest-2026-mega-finale.ts pro fim de semana.
 */
export const megaAscension: Evento = {
  slug: "mega-ascension",
  titulo: "Mega Ascension",
  periodo: {
    inicio: "2026-08-31T10:00:00-03:00",
    fim: "2026-09-04T23:00:00-03:00",
  },
  periodoTexto: "31/08 (seg) 10h → 04/09 (sex) 23h de 2026 (horário local)",
  tema: "mega",
  badge: "Limite de Passe de Reide Remoto em 30 até 04/09",
  reides: [
    {
      nivel: "Mega Raids — elenco rotativo por dia (31/08–04/09)",
      chefes: [
        { nome: "Mega Victreebel", tipos: ["Grass", "Poison"] },
        { nome: "Mega Dragonite", tipos: ["Dragon", "Flying"] },
        { nome: "Mega Malamar", tipos: ["Dark", "Psychic"] },
        { nome: "Mega Falinks", tipos: ["Fighting"] },
        { nome: "Mega Skarmory", tipos: ["Steel", "Flying"] },
        { nome: "Mega Starmie", tipos: ["Water", "Psychic"] },
        { nome: "Mega Raichu X", tipos: ["Electric"] },
        { nome: "Mega Raichu Y", tipos: ["Electric"] },
        { nome: "Mega Latias", tipos: ["Dragon", "Psychic"] },
        { nome: "Mega Latios", tipos: ["Dragon", "Psychic"] },
      ],
    },
  ],
  notaCuradoria: {
    texto: [
      "Escolha o iniciante de Kalos (Chespin, Fennekin ou Froakie) o quanto antes — a escolha define o caminho do Passe GO: Mega Finale e não dá pra trocar depois. Comparando com o plano:",
      "",
      '- Mega Chesnaught (Planta/Lutador): Planta está "baixa" (só Roserade ou Rillaboom, nunca os dois) — o maior buraco a fechar. Lutador já está "excelente" com o Mewtwo X.',
      '- Mega Greninja (Água/Sombrio): Água está "subnivelado" (titular Kyogre/Gyarados ainda pede investimento, e já tem um Greninja 2826 de reserva). Sombrio já está "ok" com o Hydreigon sortudo.',
      '- Mega Delphox (Fogo/Psíquico): o pick mais redundante — Fogo "pronto" (Chandelure) e Psíquico "excelente" (Mewtwo Y) já estão resolvidos.',
      "",
      "Recomendação: Mega Chesnaught.",
      "",
      "As Mega Raids da semana (elenco variando por dia, sem agenda oficial detalhada ainda) são a hora de acumular Mega Energia com folga antes do fim de semana do Mega Finale; com o limite de Passe de Reide Remoto em 30 até 04/09, dá pra fechar várias sem sair de casa. Capturas em Mega Raid ganham fundo especial temático até o fim do Mega Finale.",
    ].join("\n"),
    linkPlano: true,
  },
};
