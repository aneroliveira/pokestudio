import { createHash, timingSafeEqual } from "node:crypto";
import { get, put } from "@vercel/blob";
import type { ProgressoPlano } from "@/models/plano";

const CAMINHO_BLOB = "plano/progresso.json";

/**
 * Progresso do checklist, compartilhado entre aparelhos. Fica no Vercel Blob
 * e não no `data/plano.json` porque o sistema de arquivos é somente leitura
 * em serverless (ver RFC-003).
 *
 * O blob é **privado**: só esta rota o lê, com o token do projeto. E toda
 * leitura usa `useCache: false` — o CDN do Blob tem cache mínimo de 1 minuto,
 * o que faria "marquei no celular" demorar a aparecer no PC.
 */

function senhaConfere(recebida: string, esperada: string): boolean {
  // Compara digests de tamanho fixo: `timingSafeEqual` exige buffers do
  // mesmo tamanho, e assim o tempo não vaza o comprimento da senha.
  const a = createHash("sha256").update(recebida).digest();
  const b = createHash("sha256").update(esperada).digest();

  return timingSafeEqual(a, b);
}

/** Descarta chaves que não sejam booleanas — o corpo vem da rede. */
function sanitizar(dados: unknown): ProgressoPlano {
  if (typeof dados !== "object" || dados === null) return {};

  return Object.fromEntries(
    Object.entries(dados as Record<string, unknown>).filter(
      ([, valor]) => typeof valor === "boolean",
    ),
  ) as ProgressoPlano;
}

async function lerProgresso(): Promise<ProgressoPlano> {
  const blob = await get(CAMINHO_BLOB, {
    access: "private",
    useCache: false,
  });

  // `null` na primeira execução: o blob ainda não existe.
  if (!blob || blob.statusCode !== 200) return {};

  return sanitizar(await new Response(blob.stream).json());
}

export async function GET() {
  try {
    return Response.json(await lerProgresso());
  } catch {
    // Sem storage configurado a página ainda tem que abrir — ela cai no
    // cache local e avisa que está fora de sincronia.
    return Response.json({}, { status: 503 });
  }
}

export async function PUT(request: Request) {
  const esperada = process.env.PLANO_SENHA;

  if (!esperada) {
    return Response.json(
      { erro: "PLANO_SENHA não configurada — escrita desabilitada." },
      { status: 503 },
    );
  }

  const recebida = request.headers.get("x-plano-senha");

  if (!recebida || !senhaConfere(recebida, esperada)) {
    return Response.json({ erro: "Senha incorreta." }, { status: 401 });
  }

  const enviado = sanitizar(await request.json());

  try {
    // Mescla por cima do que já está gravado, em vez de substituir: se o
    // outro aparelho marcou um passo que este não conhece, ele sobrevive.
    const atual = await lerProgresso();
    const progresso = { ...atual, ...enviado };

    await put(CAMINHO_BLOB, JSON.stringify(progresso), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });

    return Response.json(progresso);
  } catch (error) {
    // Token ausente, cota estourada, storage fora do ar. O cliente trata
    // qualquer não-2xx que não seja 401 como "não sincronizado", então o
    // importante aqui é não devolver um 500 sem explicação.
    console.error("Falha ao gravar o progresso do plano:", error);

    return Response.json(
      { erro: "Não foi possível gravar no storage." },
      { status: 503 },
    );
  }
}
