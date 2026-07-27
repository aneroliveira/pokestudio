"use client";

import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";

type JsonPreviewProps = {
  pokemon: Pokemon;
};

export function JsonPreview({ pokemon }: JsonPreviewProps) {
  const [aberto, setAberto] = useState(false);
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(pokemon, null, 2);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="min-w-0 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className="flex items-center gap-2 text-xl font-semibold"
        >
          JSON
          <span className="text-sm font-normal text-muted-foreground">
            {aberto ? "▲ ocultar" : "▼ ver JSON"}
          </span>
        </button>

        {aberto && (
          <button
            type="button"
            onClick={copyToClipboard}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            {copied ? "Copiado!" : "Copiar para a área de transferência"}
          </button>
        )}
      </div>

      {aberto && (
        <pre className="mt-6 max-h-[calc(100vh-14rem)] w-full overflow-auto rounded bg-muted p-4 text-sm">
          {json}
        </pre>
      )}
    </section>
  );
}
