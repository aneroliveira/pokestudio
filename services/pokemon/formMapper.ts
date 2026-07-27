import type { CategoriaFormaPokemon, FormaPokemon } from "@/models/pokemon";

const REGIOES = ["alola", "galar", "hisui", "paldea"];

const TRADUCOES: Record<string, string> = {
    mega: "Mega",
    primal: "Primal",
    gmax: "Gigamax",

    x: "X",
    y: "Y",

    attack: "Attack",
    defense: "Defense",
    speed: "Speed",

    wash: "Wash",
    heat: "Heat",
    frost: "Frost",
    fan: "Fan",
    mow: "Mow",
};

const NOMES_BASE_ESPECIAIS: Record<string, string> = {
    "ho-oh": "Ho-Oh",
    "porygon-z": "Porygon-Z",

    "jangmo-o": "Jangmo-o",
    "hakamo-o": "Hakamo-o",
    "kommo-o": "Kommo-o",

    "mr-mime": "Mr. Mime",
    "mr-rime": "Mr. Rime",
    "mime-jr": "Mime Jr.",

    "wo-chien": "Wo-Chien",
    "chien-pao": "Chien-Pao",
    "ting-lu": "Ting-Lu",
    "chi-yu": "Chi-Yu",
};

function formatarNomeForma(partes: string[]): string {

    const base = formatarNomeBase(partes[0]);

    if (partes.length === 1) {
        return base;
    }

    if (REGIOES.includes(partes[1])) {
        return `${base} de ${capitalizar(partes[1])}`;
    }

    const prefixo = TRADUCOES[partes[1]];

    if (prefixo) {
        const restante = partes
            .slice(2)
            .map((parte) => TRADUCOES[parte] ?? capitalizar(parte))
            .join(" ");

        return [prefixo, base, restante]
            .filter(Boolean)
            .join(" ");
    }

    return [
        base,
        ...partes
            .slice(1)
            .map((parte) => TRADUCOES[parte] ?? capitalizar(parte)),
    ].join(" ");
}

export function obterFormasPokemon(
    variedades: any[],
): FormaPokemon[] {
    return variedades.map((variedade: any) => {
        const partes =
            variedade.pokemon.name.split("-");

        return {
            id: variedade.pokemon.name,
            nome: formatarNomeForma(partes),
            categoria: obterCategoriaForma(partes),
            sprite: spriteDaVariedade(variedade.pokemon.url),
        };
    });
}

// Sprite pixelado da variedade, derivado do id numérico presente na URL da
// PokéAPI (ex.: ".../pokemon/10080/"). Usa o sprite pequeno (front_default),
// mais completo para formas do que a arte oficial.
function spriteDaVariedade(url: string): string {
    const id = url.match(/\/pokemon\/(\d+)\/?$/)?.[1];

    return id
        ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        : "";
}

function capitalizar(texto: string): string {
    return (
        texto.charAt(0).toUpperCase() +
        texto.slice(1)
    );
}

function formatarNomeBase(
    nome: string,
): string {
    return NOMES_BASE_ESPECIAIS[nome] ?? capitalizar(nome);
}

function obterCategoriaForma(
    partes: string[],
): CategoriaFormaPokemon {
    if (partes.length === 1) {
        return "Normal";
    }

    const modificador = partes[1];

    if (REGIOES.includes(modificador)) {
        return "Regional";
    }

    return (
        CATEGORIAS_FORMAS[modificador] ??
        "Alternativa"
    );
}

const CATEGORIAS_FORMAS: Record<
    string,
    Exclude<CategoriaFormaPokemon, "Normal">
> = {
    mega: "Mega",
    gmax: "Gigamax",
    primal: "Primal",
};