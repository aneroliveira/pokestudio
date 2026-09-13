export interface RotinaSemanalItem {
  dia: string;
  titulo: string;
  detalhe: string;
}

/**
 * Rotina fixa que se repete toda semana — não é um Evento (não tem início/
 * fim próprios), então não entra em EVENTOS. Fonte: calendário de
 * setembro/2026 levantado pela Lorena. Quinta (Liga de Batalhas GO/PvP)
 * fica de fora a pedido dela.
 */
export const ROTINA_SEMANAL: RotinaSemanalItem[] = [
  { dia: "Segunda", titulo: "Segunda Max", detalhe: "Dynamax em destaque, 6h–21h" },
  { dia: "Terça", titulo: "5 Vitrines", detalhe: "10h–20h" },
  { dia: "Sexta", titulo: "Sextas da Amizade", detalhe: "3× bônus de troca" },
  { dia: "Domingo", titulo: "Mateo nas Rotas", detalhe: "" },
];
