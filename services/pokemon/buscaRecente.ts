import type { ItemIndicePokemon } from "@/models/indice";

// =========================
// Recentes de busca (client-only)
// =========================
//
// Últimos Pokémon vistos em `/` ou `/pocket`, em chips logo abaixo da
// busca — conveniência por aparelho, não precisa sincronizar entre
// dispositivos nem servidor. Mesma convenção de chave/try-catch de
// services/plano/planoStore.ts (lerCacheLocal/gravarCacheLocal).

const CHAVE = "pokestudio:busca:recentes";
const MAX_RECENTES = 4;

function lerLista(): ItemIndicePokemon[] {
  if (typeof window === "undefined") return [];

  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (!bruto) return [];

    const lista = JSON.parse(bruto);
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

export function lerRecentes(): ItemIndicePokemon[] {
  return lerLista();
}

/**
 * Registra um Pokémon como visto — vai pro topo, sem duplicar; a lista
 * fica limitada a MAX_RECENTES, os mais antigos saem primeiro (FIFO).
 * Retorna a lista já atualizada, pra quem chamou já re-renderizar sem
 * precisar ler de novo do storage.
 */
export function adicionarRecente(item: ItemIndicePokemon): ItemIndicePokemon[] {
  const atual = lerLista().filter((r) => r.numero !== item.numero);
  const proxima = [item, ...atual].slice(0, MAX_RECENTES);

  try {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CHAVE, JSON.stringify(proxima));
    }
  } catch {
    // Storage indisponível (privado, cheio) — recente vira só de memória.
  }

  return proxima;
}
