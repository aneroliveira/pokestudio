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
   * Marcador que a fonte usa depois de alguns golpes: "*" é golpe legado
   * (não dá mais pra ensinar, exceto via TM Elite); "+" é golpe exclusivo
   * (geralmente uma versão "Plus" do golpe carregado).
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
   * services/pokemon/recomendarMega.ts).
   */
  imagem?: string;
  escala?: number;
  /**
   * Slug da espécie BASE (ex.: "mewtwo", "landorus-incarnate") em
   * data/pokemonIndex.json — linka o card em `/?p=<nomeEn>`, mesmo padrão
   * de components/plano/ExemplarRow.tsx. É a espécie base, não a forma
   * Mega/Sombrosa/Coroada específica (o site não tem card por forma).
   */
  nomeEn?: string;
}

export interface RankingTipo {
  tipo: TipoPokemon;
  /** Top 5, já ordenado por Score (o critério de desempate da fonte). */
  atacantes: AtacanteRanking[];
}
