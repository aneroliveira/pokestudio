import type { PassoPlano, Plano, ProgressoPlano } from "@/models/plano";

const CHAVE_PROGRESSO = "pokestudio:plano:progresso";

/** Carrega a curadoria do plano (somente leitura, servida do JSON). */
export async function carregarPlano(): Promise<Plano> {
  const response = await fetch("/api/plano");

  if (!response.ok) {
    throw new Error("Erro ao carregar o plano.");
  }

  return response.json();
}

/**
 * Lê o progresso deste aparelho. Retorna `{}` em qualquer falha — sem
 * progresso salvo o plano ainda funciona, mostrando o estado commitado.
 */
export function carregarProgresso(): ProgressoPlano {
  if (typeof window === "undefined") return {};

  try {
    const bruto = window.localStorage.getItem(CHAVE_PROGRESSO);
    if (!bruto) return {};

    const dados = JSON.parse(bruto) as unknown;
    if (typeof dados !== "object" || dados === null) return {};

    // Filtra chaves estranhas: o JSON pode ter sido escrito por uma versão
    // antiga ou mexido à mão no DevTools.
    return Object.fromEntries(
      Object.entries(dados as Record<string, unknown>).filter(
        ([, valor]) => typeof valor === "boolean",
      ),
    ) as ProgressoPlano;
  } catch {
    return {};
  }
}

/**
 * Grava o progresso. Retorna `false` quando o armazenamento não está
 * disponível (navegação anônima, cota cheia), para a UI poder avisar em vez
 * de fingir que salvou.
 */
export function salvarProgresso(progresso: ProgressoPlano): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
    return true;
  } catch {
    return false;
  }
}

/**
 * Sobrepõe o progresso do aparelho ao estado commitado. Um passo que nunca
 * foi tocado aqui mantém o valor da curadoria — por isso a checagem é por
 * presença da chave, não pelo valor.
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
