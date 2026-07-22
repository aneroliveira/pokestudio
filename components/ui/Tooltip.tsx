"use client";

import { useState } from "react";

type TooltipProps = {
  content: React.ReactNode;
  className?: string;
};

export function Tooltip({ content, className = "" }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        aria-expanded={open}
        aria-label="Mostrar ajuda"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/5 text-black/70 text-xs"
        type="button"
      >
        ?
      </button>

      <div
        role="tooltip"
        className={`pointer-events-none absolute z-20 mt-1 w-[20rem] max-w-[calc(100vw-1rem)] rounded-md border border-black/5 bg-white p-3 text-sm text-zinc-700 shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all duration-200 transform origin-top-right ${
          open ? "opacity-100 pointer-events-auto scale-100 translate-y-0" : "opacity-0 -translate-y-1 scale-95"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
