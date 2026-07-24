"use client";

import { useState } from "react";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

/**
 * Tooltip por hover (desktop) e toque (mobile, com overlay para fechar ao
 * tocar fora) — mesmo padrão que resolveu o tooltip mobile da calculadora
 * de IV (commit db92c6e), generalizado para envolver qualquer trigger.
 */
export function Tooltip({ content, children, className = "" }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex cursor-default"
      >
        {children}
      </span>

      {open && (
        <button
          type="button"
          aria-label="Fechar dica"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 cursor-default"
        />
      )}

      <span
        role="tooltip"
        className={`pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-md transition-all duration-150 ${
          open ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {content}
      </span>
    </span>
  );
}
