"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainHeader() {
  const pathname = usePathname() || "/";

  const items = [
    { href: "/", label: "Home" },
    { href: "/searchIV", label: "Calculadora" },
    { href: "/admin", label: "Admin" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/6">
      <div className="mx-auto max-w-3xl px-4 py-3">
        <nav className="flex items-center justify-start gap-4">
          {items.map((it) => {
            const active = pathname === it.href || (it.href !== "/" && pathname.startsWith(it.href));
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition",
                  active ? "text-red-600 font-semibold" : "text-black/80 hover:text-black",
                )}
              >
                {it.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
