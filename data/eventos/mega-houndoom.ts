import type { Evento } from "@/models/evento";

/**
 * Fonte: calendário de setembro/2026 levantado pela Lorena (rotação semanal
 * de Mega Raids, início às 5h, sobreposta à janela do Mega Beedrill — sem
 * confirmação de como as duas rotações se relacionam entre si).
 */
export const megaHoundoom: Evento = {
  slug: "mega-houndoom",
  titulo: "Mega Houndoom",
  periodo: {
    inicio: "2026-09-11T05:00:00-03:00",
    fim: "2026-09-15T05:00:00-03:00",
  },
  periodoTexto: "11/09 (sex) 5h → 15/09 (ter) 5h de 2026 (horário local)",
  tema: "mega",
  reides: [
    {
      nivel: "Mega Raids (11→15/09)",
      chefes: [{ nome: "Mega Houndoom", tipos: ["Dark", "Fire"] }],
    },
  ],
  notaCuradoria: {
    texto:
      "Fogo já está \"pronto\" (Chandelure 3175) e Sombrio já está \"excelente\" (Hydreigon 3764) no plano — Mega Houndoom é o mais dispensável da leva de Megas do mês. Prioridade baixa: só vale correr atrás se sobrar Passe de Reide Remoto.",
    linkPlano: true,
  },
};
