import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Plano } from "@/models/plano";

const PLANO_PATH = path.resolve(process.cwd(), "data/plano.json");

/**
 * Somente leitura, de propósito. A curadoria do plano é editada no JSON e
 * commitada; o progresso do checklist, que é a única coisa que muda durante
 * o uso, fica no navegador (ver `planoStore`). Gravar aqui funcionaria só em
 * `next dev` — em serverless o sistema de arquivos é read-only, e a página
 * publicada quebraria na hora de salvar.
 */
export async function GET() {
  const conteudo = await readFile(PLANO_PATH, "utf-8");
  const plano = JSON.parse(conteudo) as Plano;

  return Response.json(plano);
}
