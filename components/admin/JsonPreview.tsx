import type { Pokemon } from "@/models/pokemon";

type JsonPreviewProps = {
    pokemon: Pokemon;
};

export function JsonPreview({
    pokemon,
}: JsonPreviewProps) {
    return (
        <section className="rounded-xl border p-6">
            <h2 className="mb-6 text-xl font-semibold">
                JSON
            </h2>

            <pre className="rounded bg-zinc-100 p-4 text-sm overflow-auto">
                {JSON.stringify(pokemon, null, 2)}
            </pre>
        </section>
    );
}