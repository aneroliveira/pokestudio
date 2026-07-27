import { TIPO_LABEL } from "@/constants/typeLabels";

function tipo(nomeTipo: string): string {
  return TIPO_LABEL[nomeTipo as keyof typeof TIPO_LABEL] ?? nomeTipo;
}

/**
 * Traduz a condição especial de evolução do GO (texto em inglês, fonte
 * pokemon-go-api). Usa padrões em vez de uma lista fixa porque a fonte
 * reaproveita as mesmas poucas frases-molde pra várias evoluções — uma
 * condição nova de um Pokémon futuro tende a encaixar em algum destes
 * padrões. Se não encaixar em nenhum, mantém o texto original em inglês
 * em vez de quebrar a tela.
 */
export function traduzirCondicaoEvolucao(quest: string): string {
  let m: RegExpMatchArray | null;

  if ((m = quest.match(/^Walk (\d+) km with your buddy$/))) {
    return `Andar ${m[1]} km com seu parceiro`;
  }

  if (quest === "Earn a heart with your buddy") {
    return "Ganhar um coração com seu parceiro";
  }

  if ((m = quest.match(/^Earn (\d+) hearts with your buddy$/))) {
    return `Ganhar ${m[1]} corações com seu parceiro`;
  }

  if ((m = quest.match(/^Give your buddy (\d+) treats$/))) {
    return `Dar ${m[1]} petiscos ao seu parceiro`;
  }

  if (quest === "Use an Incense") {
    return "Usar um Incenso";
  }

  if ((m = quest.match(/^Catch (\d+) (\w+)-type Pokémon$/))) {
    return `Capturar ${m[1]} Pokémon do tipo ${tipo(m[2])}`;
  }

  if (
    (m = quest.match(
      /^Defeat (\d+) (\w+)-type Pokémon in raids or Max Battles$/,
    ))
  ) {
    return `Derrotar ${m[1]} Pokémon do tipo ${tipo(m[2])} em raids ou Batalhas Dinâmax`;
  }

  if ((m = quest.match(/^Defeat (\d+) (\w+)-type Pokémon$/))) {
    return `Derrotar ${m[1]} Pokémon do tipo ${tipo(m[2])}`;
  }

  if ((m = quest.match(/^Defeat (\d+) (\w+)- or (\w+)-type Raid Bosses$/))) {
    return `Derrotar ${m[1]} chefes de raid do tipo ${tipo(m[2])} ou ${tipo(m[3])}`;
  }

  if ((m = quest.match(/^Defeat (\d+) (\w+)- or (\w+)-type Pokémon$/))) {
    return `Derrotar ${m[1]} Pokémon do tipo ${tipo(m[2])} ou ${tipo(m[3])}`;
  }

  return quest;
}
