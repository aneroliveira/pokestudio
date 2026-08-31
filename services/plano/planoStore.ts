import type { PassoPlano, Plano, ProgressoPlano } from "@/models/plano";

const CHAVE_CACHE = "pokestudio:plano:progresso";

/** Como terminou a última tentativa de gravar. */
export type ResultadoSalvar = "salvo" | "offline";

/** Carrega a curadoria do plano (somente leitura, servida do JSON). */
export async function carregarPlano(): Promise<Plano> {
  const response = await fetch("/api/plano");

  if (!response.ok) {
    throw new Error("Erro ao carregar o plano.");
  }

  return response.json();
}

// =========================
// Cache local
// =========================
//
// O progresso mora no Blob, compartilhado. O cache local existe só para o
// uso na rua: a página abre e responde sem esperar rede, e um toque não se
// perde se o sinal cair no meio.

function sanitizar(dados: unknown): ProgressoPlano {
  if (typeof dados !== "object" || dados === null) return {};

  return Object.fromEntries(
    Object.entries(dados as Record<string, unknown>).filter(
      ([, valor]) => typeof valor === "boolean",
    ),
  ) as ProgressoPlano;
}

export function lerCacheLocal(): ProgressoPlano {
  if (typeof window === "undefined") return {};

  try {
    const bruto = window.localStorage.getItem(CHAVE_CACHE);
    return bruto ? sanitizar(JSON.parse(bruto)) : {};
  } catch {
    return {};
  }
}

export function gravarCacheLocal(progresso: ProgressoPlano): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CHAVE_CACHE, JSON.stringify(progresso));
  } catch {
    // Cota cheia ou janela anônima: o Blob continua sendo a fonte de
    // verdade, então perder o cache não perde o progresso.
  }
}

// =========================
// Progresso remoto
// =========================

/**
 * Busca o progresso compartilhado. Devolve `null` quando não deu para
 * alcançar o servidor, para a página distinguir "ninguém marcou nada" de
 * "não consegui ler" — no segundo caso ela usa o cache local.
 */
export async function carregarProgresso(): Promise<ProgressoPlano | null> {
  try {
    const response = await fetch("/api/plano/progresso", {
      cache: "no-store",
    });

    if (!response.ok) return null;

    return sanitizar(await response.json());
  } catch {
    return null;
  }
}

/** Grava o progresso compartilhado. Escrita aberta — ver RFC-003. */
export async function salvarProgresso(
  progresso: ProgressoPlano,
): Promise<ResultadoSalvar> {
  try {
    const response = await fetch("/api/plano/progresso", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(progresso),
    });

    return response.ok ? "salvo" : "offline";
  } catch {
    return "offline";
  }
}

/**
 * Sobrepõe o progresso ao estado commitado. Um passo que nunca foi tocado
 * mantém o valor da curadoria — por isso a checagem é por presença da chave,
 * não pelo valor.
 */
export function aplicarProgresso(
  passos: PassoPlano[],
  progresso: ProgressoPlano,
): PassoPlano[] {
  return passos.map((passo) =>
    passo.id in progresso
      ? { ...passo, concluido: progresso[passo.id] }
      : passo,
  );
}
