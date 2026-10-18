import indiceData from "@/data/pokemonIndex.json";
import type { Evento } from "@/models/evento";
import type { ItemIndicePokemon } from "@/models/indice";
import type { EstadoEvento } from "@/data/eventos";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import { obterSpritePokemon } from "@/utils";

const INDICE = indiceData as ItemIndicePokemon[];
const ID_POR_NOME = new Map(INDICE.map((item) => [item.nomeEn, item.id]));
// O índice guarda algumas espécies com a forma padrão no nome
// ("minior-red-meteor", "giratina-altered") — a espécie sozinha também
// precisa achar.
for (const item of INDICE) {
  const especie = item.nomeEn.split("-")[0];
  if (!ID_POR_NOME.has(especie)) ID_POR_NOME.set(especie, item.id);
}

export interface MiniaturaEvento {
  nome: string;
  imagem: string;
  escala?: number;
}

/** Item da listagem de eventos já com as miniaturas — calculadas no
 *  servidor pra não mandar o índice da Pokédex inteiro pro navegador. */
export type ItemEventoListado = {
  evento: Evento;
  estado: EstadoEvento;
  miniaturas: MiniaturaEvento[];
};

/** "Zubat de cartola" → zubat, "Mega Chandelure" → chandelure,
 *  "Regidrago Dinamax (12/11)" → regidrago. Nomes de evento são curados em
 *  PT-BR com o nome da espécie na frente, então a primeira palavra (fora o
 *  "Mega") basta pra achar no índice. */
function spritePorNome(nome: string): string | undefined {
  const palavras = nome.toLowerCase().split(/[\s(]+/).filter(Boolean);
  const especie = palavras[0] === "mega" ? palavras[1] : palavras[0];
  const id = especie ? ID_POR_NOME.get(especie) : undefined;
  return id ? obterSpritePokemon(id) : undefined;
}

/** Até `max` miniaturas, na ordem estreias → chefes de reide → encontros.
 *  Chefe com imagem curada (ou Mega do roster) usa a dela; o resto cai no
 *  sprite da espécie. Evento ainda sem Pokémon anunciado volta vazio. */
export function miniaturasEvento(evento: Evento, max = 3): MiniaturaEvento[] {
  const candidatos: MiniaturaEvento[] = [];

  function adicionar(nome: string, imagem?: string, escala?: number) {
    if (imagem) {
      candidatos.push({ nome, imagem, escala });
      return;
    }
    // Sprite da PokeAPI tem bastante margem transparente em volta —
    // ampliado, fica do tamanho dos ícones do GO usados nos chefes.
    const sprite = spritePorNome(nome);
    if (sprite) candidatos.push({ nome, imagem: sprite, escala: 1.4 });
  }

  for (const estreia of evento.estreias?.lista ?? []) adicionar(estreia.nome);

  for (const grupo of evento.reides ?? []) {
    for (const chefe of grupo.chefes) {
      const mega = MEGAS.find((item) => item.nome === chefe.nome);
      if (mega) adicionar(chefe.nome, mega.imagem, mega.escala);
      else adicionar(chefe.nome, chefe.imagem, chefe.escala);
    }
  }

  for (const encontro of evento.encontros ?? []) adicionar(encontro.nome);

  // Mesma espécie aparece em mais de uma seção (ex.: estreia e chefe de
  // reide) — fica a primeira.
  const vistos = new Set<string>();
  return candidatos
    .filter((item) => {
      const chave = spritePorNome(item.nome) ?? item.imagem;
      if (vistos.has(chave)) return false;
      vistos.add(chave);
      return true;
    })
    .slice(0, max);
}
