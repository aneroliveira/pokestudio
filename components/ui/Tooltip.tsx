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
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/5 text-black/70 text-xs"
        type="button"
      >
        ?
      </button>

      {open && (
        <button
          type="button"
          aria-label="Fechar ajuda"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 cursor-default"
        />
      )}

      <div
        role="tooltip"
        className={`fixed inset-x-4 top-1/2 z-40 -translate-y-1/2 rounded-md border border-black/5 bg-white p-3 text-sm text-zinc-700 shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 sm:absolute sm:inset-x-auto sm:inset-x-0 sm:left-0 sm:top-full sm:mt-1 sm:w-80 sm:max-w-[calc(100vw-1rem)] sm:translate-y-0 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
