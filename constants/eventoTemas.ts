// =========================
// Presets visuais dos eventos
// =========================
//
// Tailwind v4 é zero-config (sem tailwind.config) e escaneia classes
// LITERAIS no código-fonte — não dá pra montar algo como
// `from-${cor}-500/15` em runtime a partir do JSON de um evento. Por isso
// cada evento declara seu próprio preset aqui, como classes fixas, no
// mesmo padrão de `Record<Chave, classes>` já usado em PriorityBadge e
// RecommendationChip. O registro cresce a cada evento — não é um convite
// a reaproveitar visual entre eventos diferentes.

export type TemaEvento = "agua" | "psiquico";

export interface PresetTemaEvento {
  /** Gradiente de fundo do hero (inclui variantes dark:). */
  heroGradiente: string;
  /** Cor do selo de destaque no hero (ex.: "Pico de 5× Poeira Estelar"). */
  badgeClasses: string;
  /** Cor das bolhas flutuantes do hero, uma entrada por bolha. */
  bolhasClasses: [string, string, string, string];
  /** Cor da onda SVG no rodapé do hero. */
  ondaClasses: string;
  /** Gradiente extra do card de destaque (ex.: bônus de recurso). */
  destaqueGradiente: string;
}

export const EVENTO_TEMA: Record<TemaEvento, PresetTemaEvento> = {
  agua: {
    heroGradiente:
      "from-cyan-500/15 via-sky-500/10 to-purple-500/15 dark:from-cyan-400/10 dark:via-sky-400/10 dark:to-purple-400/15",
    badgeClasses:
      "bg-cyan-500/15 text-cyan-700 dark:bg-cyan-400/15 dark:text-cyan-300",
    bolhasClasses: [
      "bg-cyan-400/60",
      "bg-sky-400/60",
      "bg-purple-400/50",
      "bg-cyan-300/60",
    ],
    ondaClasses: "text-cyan-500/25 dark:text-cyan-400/15",
    destaqueGradiente: "to-cyan-500/5 dark:to-cyan-400/10",
  },
  psiquico: {
    heroGradiente:
      "from-violet-500/15 via-fuchsia-500/10 to-indigo-500/15 dark:from-violet-400/10 dark:via-fuchsia-400/10 dark:to-indigo-400/15",
    badgeClasses:
      "bg-violet-500/15 text-violet-700 dark:bg-violet-400/15 dark:text-violet-300",
    bolhasClasses: [
      "bg-violet-400/60",
      "bg-fuchsia-400/60",
      "bg-indigo-400/50",
      "bg-violet-300/60",
    ],
    ondaClasses: "text-violet-500/25 dark:text-violet-400/15",
    destaqueGradiente: "to-violet-500/5 dark:to-violet-400/10",
  },
};
