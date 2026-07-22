"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MainHeader() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { href: "/", label: "Home" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className={cn(
      "sticky top-0 z-40",
      "backdrop-blur-sm",
      "border-b border-black/6",
      "bg-white/95",
      scrolled ? "shadow-sm" : "",
    )}>
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <nav className="flex items-center gap-4">
              {items.map((it) => {
                const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium transition",
                      active ? "text-red-600 font-semibold border-b-2 border-red-600 pb-0.5" : "text-black/80 hover:text-black",
                    )}
                  >
                    {it.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="md:hidden">
            <button
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-black/80 hover:bg-black/5"
            >
              {/* simple hamburger icon */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop placeholder to keep spacing */}
        <div className="hidden md:block" />

        {/* Mobile drawer */}
        <div
          className={cn(
            "md:hidden fixed inset-x-0 top-0 z-50 mt-14",
            "transform transition-all duration-300 ease-in-out",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
          )}
          role="dialog"
          aria-modal="true"
        >
          <div className={cn("mx-4 rounded-lg bg-white p-4 shadow-lg")}>
            <nav className="flex flex-col gap-3">
              {items.map((it) => {
                const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
                return (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-base font-medium py-2",
                      active ? "text-red-600 font-semibold" : "text-black/80 hover:text-black",
                    )}
                  >
                    {it.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
