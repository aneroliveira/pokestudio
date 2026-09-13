import type { EstadoEvento } from "@/data/eventos";

/** Rótulo e classes do selo de estado (ativo/em-breve/encerrado) — usado na
 *  listagem de eventos e na navegação rápida entre eventos. */
export const ROTULO_ESTADO: Record<EstadoEvento, string> = {
  ativo: "Ativo agora",
  "em-breve": "Em breve",
  encerrado: "Encerrado",
};

export const ESTILO_ESTADO: Record<EstadoEvento, string> = {
  ativo: "bg-good text-good-foreground",
  "em-breve": "bg-attention text-attention-foreground",
  encerrado: "bg-secondary text-secondary-foreground",
};

/** Só a cor de fundo, pro pontinho de estado nos pills de navegação rápida. */
export const COR_PONTO_ESTADO: Record<EstadoEvento, string> = {
  ativo: "bg-good",
  "em-breve": "bg-attention",
  encerrado: "bg-secondary",
};
