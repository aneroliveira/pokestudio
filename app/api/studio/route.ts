import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PokemonStudio } from "@/models/pokemon";

const STUDIO_PATH = path.resolve(process.cwd(), "data/studio.json");

type StudioMap = Record<string, PokemonStudio>;

async function lerStudio(): Promise<StudioMap> {
  try {
    const conteudo = await readFile(STUDIO_PATH, "utf-8");
    return JSON.parse(conteudo) as StudioMap;
  } catch {
    return {};
  }
}

export async function GET() {
  const studio = await lerStudio();
  return Response.json(studio);
}

export async function PUT(request: Request) {
  const body = (await request.json()) as {
    numero?: string;
    studio?: PokemonStudio;
  };

  if (!body.numero || !body.studio) {
    return Response.json(
      { erro: "numero e studio são obrigatórios." },
      { status: 400 },
    );
  }

  const studio = await lerStudio();
  studio[body.numero] = body.studio;

  await writeFile(STUDIO_PATH, JSON.stringify(studio, null, 2), "utf-8");

  return Response.json({ ok: true, numero: body.numero });
}
