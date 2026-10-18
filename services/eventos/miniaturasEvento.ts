import type { Evento } from "@/models/evento";
import type { EstadoEvento } from "@/data/eventos";
import { MEGAS } from "@/services/pokemon/recomendarMega";
import { especiePorNome } from "@/services/eventos/especiePokemon";
import { obterSpritePokemon } from "@/utils";

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

function spritePorNome(nome: string): string | undefined {
  const especie = especiePorNome(nome);
  return especie ? obterSpritePokemon(especie.id) : undefined;
}

/** Todos os Pokémon do evento, na ordem estreias → chefes de reide →
 *  encontros. Chefe com imagem curada (ou Mega do roster) usa a dela; o
 *  resto cai no sprite da espécie. Evento ainda sem Pokémon anunciado volta
 *  vazio. */
export function miniaturasEvento(evento: Evento): MiniaturaEvento[] {
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

  // O mesmo Pokémon aparece em mais de uma seção (ex.: estreia e chefe de
  // reide, às vezes com a data entre parênteses só no chefe) — fica a
  // primeira. Compara pelo nome, não pela espécie, pra não juntar formas
  // diferentes (Mega Charizard X e Y, Kyurem Branco e Negro).
  const vistos = new Set<string>();
  return candidatos.filter((item) => {
    const chave = item.nome.replace(/\s*\(.*\)\s*/g, "").toLowerCase();
    if (vistos.has(chave)) return false;
    vistos.add(chave);
    return true;
  });
}
