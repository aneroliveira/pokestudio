// =========================
// Vigia de eventos do Pokémon GO
// =========================
//
// Roda no GitHub Actions (.github/workflows/vigia-eventos.yml) e manda pro
// Telegram o que apareceu de novo desde a última rodada. Não publica nada
// no site — os arquivos de data/eventos/ continuam sendo montados com o
// Claude, depois do aviso.
//
// Fontes, da mais confiável pra menos:
//   ✅ ScrapedDuck (JSON do Leek Duck) e blog oficial pt-BR → confirmado
//   🔎 PokeMiners (datamine) e YouTube do Mestre Yodoh      → sinal, não confirmado
//
// O estado (o que já foi visto) fica num JSON, guardado entre rodadas pelo
// cache do Actions. Fonte sem estado ainda (primeira rodada, cache perdido
// ou fonte nova) só registra, sem avisar — senão o primeiro aviso viria com
// dezenas de itens antigos.
//
// Uso local, sem mandar nada: `node scripts/vigiaEventos.mjs --seco`
// Só testar o Telegram (não lê fontes nem mexe no estado): `--teste`

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ARQUIVO_ESTADO = process.env.VIGIA_ESTADO ?? ".vigia/estado.json";
const SECO = process.argv.includes("--seco");

const SCRAPEDDUCK =
  "https://raw.githubusercontent.com/bigfoott/ScrapedDuck/data/events.min.json";
const BLOG = "https://pokemongo.com/pt_BR/news";
const POKEMINERS = ["PokeMiners/pogo_assets", "PokeMiners/game_masters"];
const YOUTUBE = [{ nome: "Mestre Yodoh", canal: "UCfE7b7kqR5W8XSEvdfrnciw" }];

/** Tipos do Leek Duck que o site não acompanha (ver data/eventos/) — rotina
 *  semanal ou coisa fora do escopo do calendário. Horas de Reide já entram
 *  junto da rotação em `raid-battles`. */
const TIPOS_IGNORADOS = new Set([
  "pokemon-spotlight-hour",
  "max-mondays",
  "go-battle-league",
  "twitch-drops",
  "season",
  "raid-hour",
]);

/** Quantos IDs guardar por lista — o suficiente pra cobrir o que as fontes
 *  mostram de uma vez (a página do blog lista ~30 posts, o RSS ~15). */
const MAX_IDS = 200;

// ---------- utilidades ----------

function hash(valor) {
  return createHash("sha1").update(JSON.stringify(valor)).digest("hex").slice(0, 12);
}

function escaparHtml(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function decodificarEntidades(texto) {
  return texto
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

/** "2026-11-21T14:00:00.000" → "21/11 14h" (o Leek Duck já dá horário local). */
function dataCurta(iso) {
  if (!iso) return "?";
  const [data, hora = ""] = iso.split("T");
  const [, mes, dia] = data.split("-");
  const [h, m] = hora.split(":");
  const horario = h ? ` ${Number(h)}h${m && m !== "00" ? m : ""}` : "";
  return `${dia}/${mes}${horario}`;
}

async function buscar(url, opcoes = {}) {
  const resposta = await fetch(url, {
    ...opcoes,
    headers: { "User-Agent": "pokestudio-vigia", ...opcoes.headers },
    signal: AbortSignal.timeout(30_000),
  });
  if (!resposta.ok) throw new Error(`${resposta.status} em ${url}`);
  return resposta;
}

function guardarIds(lista, novos) {
  return [...novos, ...lista.filter((id) => !novos.includes(id))].slice(0, MAX_IDS);
}

// ---------- fontes ----------

/** Evento novo, ou evento que mudou nome/datas/detalhes (ex.: Community Day
 *  que ganhou o Pokémon anunciado). */
async function vigiarScrapedDuck(estado) {
  const eventos = await (await buscar(SCRAPEDDUCK)).json();
  const anterior = estado.scrapedduck;
  const atual = {};
  const avisos = [];
  const agora = new Date().toISOString().slice(0, 16);

  for (const evento of eventos) {
    if (TIPOS_IGNORADOS.has(evento.eventType)) continue;
    // Evento já encerrado não interessa — e ainda pode sumir e voltar da
    // lista conforme o Leek Duck arquiva.
    if (evento.end && evento.end.slice(0, 16) < agora) continue;

    const assinatura = hash([evento.name, evento.start, evento.end, evento.extraData]);
    atual[evento.eventID] = assinatura;

    if (!anterior) continue;
    const antes = anterior[evento.eventID];
    if (antes === assinatura) continue;

    avisos.push(
      `${antes ? "✏️ Atualizado" : "🆕 Novo"}: <a href="${escaparHtml(evento.link)}">${escaparHtml(evento.name)}</a> — ${dataCurta(evento.start)} → ${dataCurta(evento.end)}`,
    );
  }

  // Guarda também o que já estava no estado e saiu da lista agora (ex.:
  // encerrou) — se voltar, não conta como novo.
  estado.scrapedduck = { ...(anterior ?? {}), ...atual };
  return avisos;
}

async function vigiarBlog(estado) {
  const html = await (await buscar(BLOG, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
  // A página traz a lista de posts num bloco JSON-LD (ItemList).
  const posts = [
    ...html.matchAll(/"url":"(https:\/\/pokemongo\.com\/pt_BR\/news\/[^"]+)","name":"([^"]+)"/g),
  ].map(([, url, titulo]) => ({ url, titulo: decodificarEntidades(titulo) }));

  if (posts.length === 0) throw new Error("nenhum post encontrado — o layout do blog mudou?");

  const anterior = estado.blog;
  const avisos = anterior
    ? posts
        .filter((post) => !anterior.includes(post.url))
        .map((post) => `📰 <a href="${escaparHtml(post.url)}">${escaparHtml(post.titulo)}</a>`)
    : [];

  estado.blog = guardarIds(anterior ?? [], posts.map((post) => post.url));
  return avisos;
}

async function vigiarPokeMiners(estado) {
  const anterior = estado.pokeminers;
  const atual = { ...(anterior ?? {}) };
  const avisos = [];
  const cabecalhos = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {};

  for (const repo of POKEMINERS) {
    const commits = await (
      await buscar(`https://api.github.com/repos/${repo}/commits?per_page=10`, {
        headers: cabecalhos,
      })
    ).json();
    if (!Array.isArray(commits) || commits.length === 0) continue;

    atual[repo] = commits[0].sha;
    if (!anterior || !anterior[repo]) continue;

    const indice = commits.findIndex((commit) => commit.sha === anterior[repo]);
    const novos = indice === -1 ? commits : commits.slice(0, indice);
    for (const commit of novos) {
      // Commits de merge repetem a mensagem do PR — pula pra não duplicar.
      if (commit.parents?.length > 1) continue;
      const mensagem = commit.commit.message.split("\n")[0];
      avisos.push(
        `🔎 <a href="${escaparHtml(commit.html_url)}">${escaparHtml(repo.split("/")[1])}</a>: ${escaparHtml(mensagem)}`,
      );
    }
  }

  estado.pokeminers = atual;
  return avisos;
}

async function vigiarYouTube(estado) {
  const anterior = estado.youtube;
  let todos = anterior ?? [];
  const avisos = [];

  for (const { nome, canal } of YOUTUBE) {
    const xml = await (
      await buscar(`https://www.youtube.com/feeds/videos.xml?channel_id=${canal}`)
    ).text();
    const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entrada]) => ({
      id: entrada.match(/<yt:videoId>([^<]+)/)?.[1],
      titulo: decodificarEntidades(entrada.match(/<title>([^<]*)/)?.[1] ?? ""),
    }));

    if (anterior) {
      for (const video of videos) {
        if (!video.id || anterior.includes(video.id)) continue;
        avisos.push(
          `🎬 ${escaparHtml(nome)}: <a href="https://www.youtube.com/watch?v=${video.id}">${escaparHtml(video.titulo)}</a>`,
        );
      }
    }

    todos = guardarIds(todos, videos.map((video) => video.id).filter(Boolean));
  }

  estado.youtube = todos;
  return avisos;
}

// ---------- Telegram ----------

/** Telegram corta mensagem em 4096 caracteres — divide por linha. */
function dividir(texto, limite = 3800) {
  const partes = [];
  let atual = "";
  for (const linha of texto.split("\n")) {
    if (atual && atual.length + linha.length + 1 > limite) {
      partes.push(atual);
      atual = "";
    }
    atual += (atual ? "\n" : "") + linha;
  }
  if (atual) partes.push(atual);
  return partes;
}

async function enviarTelegram(texto) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) throw new Error("faltam TELEGRAM_BOT_TOKEN e/ou TELEGRAM_CHAT_ID");

  for (const parte of dividir(texto)) {
    await buscar(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        text: parte,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
  }
}

// ---------- rodada ----------

if (process.argv.includes("--teste")) {
  await enviarTelegram(
    "✅ <b>Vigia de eventos conectado!</b>\nOs avisos vão chegar aqui às 9h, 13h, 17h e 21h quando houver novidade.",
  );
  console.log("Mensagem de teste enviada.");
  process.exit(0);
}

const estado = existsSync(ARQUIVO_ESTADO)
  ? JSON.parse(readFileSync(ARQUIVO_ESTADO, "utf8"))
  : {};

const SECOES = [
  { titulo: "✅ <b>Confirmado — Leek Duck</b>", vigiar: vigiarScrapedDuck, nome: "ScrapedDuck" },
  { titulo: "✅ <b>Confirmado — blog oficial</b>", vigiar: vigiarBlog, nome: "blog oficial" },
  { titulo: "🔎 <b>Sinal — datamine (não confirmado)</b>", vigiar: vigiarPokeMiners, nome: "PokeMiners" },
  { titulo: "🔎 <b>Sinal — vídeos (não confirmado)</b>", vigiar: vigiarYouTube, nome: "YouTube" },
];

const blocos = [];
const falhas = [];

for (const secao of SECOES) {
  try {
    const avisos = await secao.vigiar(estado);
    console.log(`${secao.nome}: ${avisos.length} novidade(s)`);
    if (avisos.length > 0) blocos.push([secao.titulo, ...avisos].join("\n"));
  } catch (erro) {
    // Uma fonte fora do ar não derruba as outras; o estado dela fica como
    // estava e ela é conferida de novo na próxima rodada.
    console.error(`${secao.nome} falhou: ${erro.message}`);
    falhas.push(secao.nome);
  }
}

if (blocos.length > 0) {
  const temConfirmado = blocos.some((bloco) => bloco.startsWith("✅"));
  const mensagem = [
    "<b>PokéPocket — novidades de eventos</b>",
    ...blocos,
    temConfirmado ? "👉 Tem evento confirmado: abre o Claude e pede “atualiza os eventos”." : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  if (SECO) {
    console.log(`\n--- mensagem (modo seco, não enviada) ---\n${mensagem}`);
  } else {
    await enviarTelegram(mensagem);
    console.log("Mensagem enviada pro Telegram.");
  }
} else {
  console.log("Nada novo.");
}

// Só salva depois do envio — se o Telegram falhar, a rodada seguinte avisa
// de novo em vez de perder a novidade.
mkdirSync(dirname(ARQUIVO_ESTADO), { recursive: true });
writeFileSync(ARQUIVO_ESTADO, JSON.stringify(estado, null, 2));

if (falhas.length === SECOES.length) {
  console.error("Todas as fontes falharam.");
  process.exit(1);
}
