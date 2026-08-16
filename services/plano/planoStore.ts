import type { Plano } from "@/models/plano";

/** Carrega o plano de coleção persistido no backend. */
export async function carregarPlano(): Promise<Plano> {
  const response = await fetch("/api/plano");

  if (!response.ok) {
    throw new Error("Erro ao carregar o plano.");
  }

  return response.json();
}

/** Marca ou desmarca um passo da ordem de execução. */
export async function salvarPasso(
  passo: string,
  concluido: boolean,
): Promise<void> {
  const response = await fetch("/api/plano", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ passo, concluido }),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar o passo.");
  }
}
