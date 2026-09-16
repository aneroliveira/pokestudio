import type { Evento } from "@/models/evento";

/**
 * Fonte: leekduck.com/events/choose-your-path-twilight-trails-2026 e
 * pokemongo.com/en/news/choose-your-path-twilight-trails-2026, confirmado
 * 16/09/2026. Confirma as datas e os 3 caminhos (Explore/Catch/Battle —
 * nome oficial em PT-BR ainda não confirmado, por isso mantenho em
 * português livre: Explorar/Capturar/Batalhar). As tarefas e bônus
 * específicos de cada caminho ainda não foram divulgados pela Niantic nem
 * pelo Leek Duck, e variam de edição pra edição — não dá pra prever com
 * segurança, fica "a confirmar" até sair a página oficial desta semana.
 */
export const escolhaSeuCaminho: Evento = {
  slug: "escolha-seu-caminho",
  titulo: "Escolha Seu Caminho",
  periodo: {
    inicio: "2026-09-23T10:00:00-03:00",
    fim: "2026-09-28T20:00:00-03:00",
  },
  periodoTexto: "23/09 (qua) 10h → 28/09 (seg) 20h de 2026 (horário local)",
  tema: "comunidade",
  badge: "3 caminhos: Explorar, Capturar ou Batalhar",
  notaCuradoria: {
    texto:
      "Pesquisa temporária com 3 caminhos — escolhe um só, sem trocar depois, e ele define as tarefas/bônus da semana. Nem a Niantic nem o Leek Duck divulgaram os detalhes específicos desta edição ainda (o bônus muda de edição pra edição, então não dá pra chutar com segurança). Atualizo assim que sair. Nada essencial pro plano de reide de qualquer forma.",
  },
};
