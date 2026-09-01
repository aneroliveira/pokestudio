"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Tema = "light" | "dark";

function temaAtual(): Tema {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [tema, setTema] = useState<Tema>("light");
  const [montado, setMontado] = useState(false);

  // Sincroniza com o estado já aplicado pelo script anti-flash no <html>.
  //
  // O setState aqui é intencional e não tem alternativa: o valor só existe
  // no DOM depois da hidratação, e lê-lo durante o render quebraria o SSR.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTema(temaAtual());
    setMontado(true);
  }, []);

  function alternar() {
    const proximo: Tema = tema === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", proximo === "dark");
    try {
      localStorage.setItem("tema", proximo);
    } catch {
      // localStorage indisponível — segue sem persistir.
    }
    setTema(proximo);
  }

  const escuro = tema === "dark";

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={escuro ? "Ativar tema claro" : "Ativar tema escuro"}
      title={escuro ? "Tema claro" : "Tema escuro"}
      className="rounded-md p-2 text-foreground/70 transition hover:bg-accent hover:text-foreground"
    >
      {/* Evita mismatch de hidratação: só decide o ícone após montar. */}
      {montado && escuro ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
