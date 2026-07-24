/**
 * Fundo decorativo do app — sutil e temático (RFC de ajustes).
 * Camada fixa atrás de todo o conteúdo, sem interação. Adapta-se aos
 * dois temas via tokens e variantes dark.
 */
export function AppBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Glow primário (roxo) no canto superior direito */}
      <div className="absolute -right-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-[130px] dark:bg-primary/20" />

      {/* Glow frio, discreto, no canto inferior esquerdo */}
      <div className="absolute -bottom-48 -left-40 h-[30rem] w-[30rem] rounded-full bg-sky-400/10 blur-[130px] dark:bg-sky-500/10" />

      {/* Malha de pontos (estilo Linear/Arc), desbotada nas bordas */}
      <div
        className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, var(--border) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 82%)",
        }}
      />

      {/* Pokéball marca-d'água, bem leve, no canto inferior direito */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="absolute -bottom-24 -right-16 h-[28rem] w-[28rem] rotate-[-12deg] text-foreground opacity-[0.035] dark:opacity-[0.06]"
      >
        <circle cx="50" cy="50" r="46" />
        <line x1="4" y1="50" x2="34" y2="50" />
        <line x1="66" y1="50" x2="96" y2="50" />
        <circle cx="50" cy="50" r="14" />
        <circle cx="50" cy="50" r="5.5" fill="currentColor" />
      </svg>
    </div>
  );
}
