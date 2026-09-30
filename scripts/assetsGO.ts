import sharp from "sharp";

// Helpers compartilhados pelos scripts que geram rosters de formas do GO a
// partir do mirror pokemon-go-api (gerarMegas.ts, gerarGigantamax.ts).

export const FONTE_POKEDEX =
  "https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json";

export const BASE_ASSETS =
  "https://raw.githubusercontent.com/pokemon-go-api/assets/main/Pokemon";

export async function existeAsset(url: string): Promise<boolean> {
  try {
    const resposta = await fetch(url, { method: "HEAD" });
    return resposta.ok;
  } catch {
    return false;
  }
}

/**
 * Monta as URLs do ícone por forma (`pm<dex>.f<TOKEN>.icon.png` e a versão
 * shiny) e só usa cada uma se o arquivo existir de verdade (HEAD) — o mirror
 * às vezes aponta o ícone BASE da espécie no lugar do da forma (visto em
 * Mewtwo X/Y e Victreebel), e nem toda forma tem arte própria (Raichu X/Y
 * dá 404 e o base é a arte certa). Sem arquivo por forma, cai no fallback.
 */
export async function resolverImagensForma(
  dexNr: number,
  token: string,
  fallback: { imagem?: string; imagemShiny?: string },
): Promise<{ imagem?: string; imagemShiny?: string }> {
  const candidataImagem = `${BASE_ASSETS}/pm${dexNr}.f${token}.icon.png`;
  const candidataShiny = `${BASE_ASSETS}/pm${dexNr}.f${token}.s.icon.png`;

  const [imagemExiste, shinyExiste] = await Promise.all([
    existeAsset(candidataImagem),
    existeAsset(candidataShiny),
  ]);

  return {
    imagem: imagemExiste ? candidataImagem : fallback.imagem,
    imagemShiny: shinyExiste ? candidataShiny : fallback.imagemShiny,
  };
}

/**
 * Preenchimento (maior lado do personagem ÷ lado do canvas) da arte oficial
 * usada como imagem normal do Pokémon (`pokemon.oficial.imagem`) — medido
 * com sharp em 5 espécies bem diferentes (Victreebel, Mewtwo, Onix,
 * Diglett, Gengar): as 5 deram exatamente 0.907, ou seja, é uma margem
 * fixa da própria arte oficial, não algo que varia por espécie.
 */
const PREENCHIMENTO_BASE = 0.907;

/** Preenchimento mínimo/máximo aceitos — fora disso a medição provavelmente
 *  falhou (ícone quase todo transparente, erro de decode) e não deve
 *  gerar um fator de escala absurdo. */
const ESCALA_MIN = 0.75;
const ESCALA_MAX = 1.4;

/**
 * Mede quanto do canvas do ícone da forma é ocupado pelo personagem e
 * devolve o fator de escala pra igualar ao preenchimento da arte oficial —
 * os ícones do GO vêm de um estilo de arte diferente (ícone de jogo, não
 * ilustração oficial) e cada um tem uma margem própria, sem padrão fixo
 * (confirmado nas Megas: Victreebel quase igual à base, Mewtwo X ~10%
 * menor, Gengar ~2% maior) — por isso mede por forma em vez de aplicar um
 * fator único.
 */
export async function medirEscala(url: string): Promise<number | undefined> {
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) return undefined;

    const buffer = Buffer.from(await resposta.arrayBuffer());
    const { data, info } = await sharp(buffer)
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    const { width, height } = info;
    let minX = width, minY = height, maxX = -1, maxY = -1;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const alpha = data[(y * width + x) * 4 + 3];
        if (alpha > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (maxX < 0) return undefined;

    const conteudo = Math.max(maxX - minX + 1, maxY - minY + 1);
    const preenchimento = conteudo / Math.max(width, height);
    if (preenchimento <= 0) return undefined;

    const escala = PREENCHIMENTO_BASE / preenchimento;
    return Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, Number(escala.toFixed(3))));
  } catch {
    return undefined;
  }
}
