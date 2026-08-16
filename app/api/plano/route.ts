import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Plano } from "@/models/plano";

const PLANO_PATH = path.resolve(process.cwd(), "data/plano.json");

async function lerPlano(): Promise<Plano> {
  const conteudo = await readFile(PLANO_PATH, "utf-8");
  return JSON.parse(conteudo) as Plano;
}

export async function GET() {
  const plano = await lerPlano();
  return Response.json(plano);
}

/**
 * Marca/desmarca um passo da ordem de execução. É a única escrita do
 * plano: o resto (auditoria, etiquetas, aprendizados) é curadoria manual,
 * editada direto no JSON.
 */
export async function PATCH(request: Request) {
  const body = (await request.json()) as {
    passo?: string;
    concluido?: boolean;
  };

  if (!body.passo || typeof body.concluido !== "boolean") {
    return Response.json(
      { erro: "passo e concluido são obrigatórios." },
      { status: 400 },
    );
  }

  const plano = await lerPlano();
  const passo = plano.ordemExecucao.find((item) => item.id === body.passo);

  if (!passo) {
    return Response.json(
      { erro: `Passo "${body.passo}" não existe.` },
      { status: 404 },
    );
  }

  passo.concluido = body.concluido;

  await writeFile(PLANO_PATH, JSON.stringify(plano, null, 2), "utf-8");

  return Response.json({ ok: true, passo: passo.id });
}
