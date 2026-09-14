import type { TipoPokemon } from "./pokemon";

// =========================
// Domínio Atacante (ranking "melhores atacantes por tipo")
// =========================
//
// Dado 100% curado a partir de fonte externa (db.pokemongohub.net/pt/best/
// attackers-per-type) — o site não tem dados de dano/DPS de movimentos
// pra calcular isso por conta própria (só tipo, stats base e efetividade).

export interface GolpeAtacante {
  nome: string;
  /**
   * Marcador que a fonte usa depois de alguns golpes ("*"/"+") — indica
   * golpe exclusivo/legado (Elite TM, Community Day ou evento passado),
   * sem uma regra 100% confirmada pra diferenciar os dois símbolos. Vira
   * só um selo genérico na UI.
   */
  marcador?: "*" | "+";
}

export interface AtacanteRanking {
  nome: string;
  /** Tipo(s) do Pokémon — usado pro fallback de ícone quando não há sprite. */
  tipos: TipoPokemon[];
  rapido: GolpeAtacante;
  carregado: GolpeAtacante;
  dps: number;
  tdo: number;
  score: number;
  /**
   * Curado manualmente só quando o nome não bate com nada em
   * data/megas.json (aí o sprite sai de graça, ver
   * services/pokemon/recomendarMega.ts). Ainda faltam vários — entram sem
   * `imagem` por enquanto e caem no fallback de ícone de tipo.
   */
  imagem?: string;
  escala?: number;
}

export interface RankingTipo {
  tipo: TipoPokemon;
  /** Top 5, já ordenado por Score (o critério de desempate da fonte). */
  atacantes: AtacanteRanking[];
}
