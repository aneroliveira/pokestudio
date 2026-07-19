import type { ClimaPokemon, TipoPokemon } from "@/models/pokemon";

export const CLIMA_POR_TIPO: Partial<Record<TipoPokemon, ClimaPokemon>> = {
    Normal: "Parcialmente nublado",
    Pedra: "Parcialmente nublado",

    Fogo: "Ensolarado",
    Planta: "Ensolarado",
    Terra: "Ensolarado",

    Água: "Chuvoso",
    Elétrico: "Chuvoso",
    Inseto: "Chuvoso",

    Gelo: "Neve",

    Dragão: "Ventando",
    Psíquico: "Ventando",
    Voador: "Ventando",

    Fantasma: "Neblina",
    Sombrio: "Neblina",

    Lutador: "Nublado",
    Fada: "Nublado",
    Veneno: "Nublado",

    Aço: "Neve",
};