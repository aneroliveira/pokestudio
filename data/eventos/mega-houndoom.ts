import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/mega-houndoom-in-mega-raids-september-2026,
 * horário de término corrigido pra 21h (mesmo ajuste do Mega Beedrill,
 * confirmado por um card de reide mais preciso) — 11/09 6h → 15/09 21h
 * local. Sobreposta de propósito à janela do Mega Beedrill: as duas
 * rotações são reais e concorrentes, ligadas ao evento "Mega Squads".
 */
export const megaHoundoom: Evento = {
  slug: "mega-houndoom",
  titulo: "Mega Houndoom",
  periodo: {
    inicio: "2026-09-11T06:00:00-03:00",
    fim: "2026-09-15T21:00:00-03:00",
  },
  periodoTexto: "11/09 (sex) 6h → 15/09 (ter) 21h de 2026 (horário local)",
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
