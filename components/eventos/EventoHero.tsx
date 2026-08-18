import { Sparkles } from "lucide-react";
import { EVENTO_TEMA, type TemaEvento } from "@/constants/eventoTemas";

type EventoHeroProps = {
  titulo: string;
  periodoTexto: string;
  tema: TemaEvento;
  badge?: string;
};

/** Hero temático de evento — gradiente, sheen e bolhas seguem o preset
 *  de `tema` (ver constants/eventoTemas.ts). */
export function EventoHero({ titulo, periodoTexto, tema, badge }: EventoHeroProps) {
  const preset = EVENTO_TEMA[tema];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-border bg-linear-to-br p-6 shadow-sm sm:p-8 ${preset.heroGradiente}`}
    >
      <div
        aria-hidden
        className="animate-festival-shimmer pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(100deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
        }}
      />

      <span
        aria-hidden
        className={`animate-festival-float pointer-events-none absolute bottom-5 left-10 h-2 w-2 rounded-full ${preset.bolhasClasses[0]}`}
        style={{ animationDelay: "0s" }}
      />
      <span
        aria-hidden
        className={`animate-festival-float pointer-events-none absolute bottom-3 left-24 h-1.5 w-1.5 rounded-full ${preset.bolhasClasses[1]}`}
        style={{ animationDelay: "1.1s" }}
      />
      <span
        aria-hidden
        className={`animate-festival-float pointer-events-none absolute bottom-7 right-16 h-2.5 w-2.5 rounded-full ${preset.bolhasClasses[2]}`}
        style={{ animationDelay: "0.6s" }}
      />
      <span
        aria-hidden
        className={`animate-festival-float pointer-events-none absolute bottom-2 right-32 h-1.5 w-1.5 rounded-full ${preset.bolhasClasses[3]}`}
        style={{ animationDelay: "1.9s" }}
      />

      <svg
        aria-hidden
        viewBox="0 0 400 40"
        preserveAspectRatio="none"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-8 w-full ${preset.ondaClasses}`}
      >
        <path
          fill="currentColor"
          d="M0,20 C50,35 100,5 150,20 C200,35 250,5 300,20 C350,35 400,5 400,20 L400,40 L0,40 Z"
        />
      </svg>

      <div className="relative">
        {badge && (
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${preset.badgeClasses}`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {badge}
          </span>
        )}

        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {titulo}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          {periodoTexto}
        </p>
      </div>
    </div>
  );
}
