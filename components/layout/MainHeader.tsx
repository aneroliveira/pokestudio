"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

/** Pokébola do favicon (app/icon.svg) — é o link da Home no header. */
function IconePokebola({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M2 32A30 30 0 0 1 62 32Z" fill="#ee1515" />
      <path d="M2 32A30 30 0 0 0 62 32Z" fill="#ffffff" />
      <circle cx="32" cy="32" r="30" fill="none" stroke="#1a1a1a" strokeWidth="3" />
      <rect x="2" y="29" width="60" height="6" fill="#1a1a1a" />
      <circle cx="32" cy="32" r="9" fill="#ffffff" stroke="#1a1a1a" strokeWidth="3" />
      <circle cx="32" cy="32" r="3.5" fill="#ffffff" stroke="#1a1a1a" strokeWidth="2" />
    </svg>
  );
}

export function MainHeader() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const emAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "/eventos", label: "Eventos" },
    { href: "/atacantes", label: "Atacantes" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-40",
      "backdrop-blur-sm",
      "border-b border-border",
      "bg-background/80",
      scrolled ? "shadow-sm" : "",
    )}>
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
        {/* Os links ficam sempre à mostra, inclusive no celular — o menu
            sanduíche pedia dois toques pra trocar de página. Com 4 itens
            curtos cabe numa linha; se a tela for estreita demais, a faixa
            rola pro lado em vez de quebrar a altura do header (outros
            componentes grudam em top-14 contando com ela). */}
        <nav className="-mx-1 flex min-w-0 items-center gap-3 overflow-x-auto px-1 py-0.5 [scrollbar-width:none] sm:gap-4">
          <Link
            href="/"
            aria-label="Home"
            title="Home"
            aria-current={pathname === "/" ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full transition hover:rotate-12",
              pathname === "/"
                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                : "opacity-80 hover:opacity-100",
            )}
          >
            <IconePokebola className="h-6 w-6" />
          </Link>

          {items.map((it) => {
            const active = pathname.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "shrink-0 whitespace-nowrap border-b-2 pb-0.5 text-sm font-medium transition",
                  active
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent text-foreground/70 hover:text-foreground",
                )}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>

        {/* Admin (ícone) + toggle de tema à direita */}
        <div className="flex shrink-0 items-center gap-1">
          <Link
            href="/admin"
            aria-label="Admin"
            aria-current={emAdmin ? "page" : undefined}
            className={cn(
              "rounded-md p-2 transition hover:bg-accent",
              emAdmin ? "text-primary" : "text-foreground/70 hover:text-foreground",
            )}
          >
            <Lock className="h-4 w-4" />
          </Link>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
