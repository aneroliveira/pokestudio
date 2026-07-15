"use client";

import { useState } from "react";
import type { Pokemon } from "@/models/pokemon";

type JsonPreviewProps = {
  pokemon: Pokemon;
};

export function JsonPreview({ pokemon }: JsonPreviewProps) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(pokemon, null, 2);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">JSON</h2>
        <button
          type="button"
          onClick={copyToClipboard}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700"
        >
          {copied ? "Copiado!" : "Copiar para a área de transferência"}
        </button>
      </div>

      <pre className="max-h-[calc(100vh-14rem)] overflow-auto rounded bg-zinc-100 p-4 text-sm">
        {json}
      </pre>
    </section>
  );
}
