import type { StatusTipo } from "@/models/plano";

export const STATUS_TIPO_LABEL: Record<StatusTipo, string> = {
  excelente: "Excelente",
  pronto: "Pronto",
  ok: "OK",
  subnivelado: "Sub-nivelado",
  magro: "Magro",
  baixa: "Baixa prioridade",
  buraco: "Buraco",
};

/** Mesma escala de cor dos chips de decisão: verde / amarelo / vermelho. */
export const STATUS_TIPO_CLASSE: Record<StatusTipo, string> = {
  excelente: "bg-good text-good-foreground",
  pronto: "bg-good text-good-foreground",
  ok: "bg-good text-good-foreground",
  subnivelado: "bg-attention text-attention-foreground",
  magro: "bg-attention text-attention-foreground",
  baixa: "bg-muted text-muted-foreground",
  buraco: "bg-bad text-bad-foreground",
};
