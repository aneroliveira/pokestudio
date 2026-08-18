import type { Evento } from "@/models/evento";

export const festivalAquatico: Evento = {
  slug: "festival-aquatico",
  titulo: "Festival Aquático Ultra Bônus",
  periodo: {
    inicio: "2026-08-18T10:00:00-03:00",
    fim: "2026-08-24T20:00:00-03:00",
  },
  periodoTexto: "18 a 24 de agosto de 2026",
  tema: "agua",
  badge: "Pico de 5× Poeira Estelar em 22–24/08",
  estreias: {
    lista: [
      {
        nome: "Arrokuda",
        tipos: ["Water"],
        origem:
          "Pesquisa de Campo, Passe GO e Iscas Chuvosas. Evolui em Barraskewda com 50 doces.",
      },
      {
        nome: "Cramorant",
        tipos: ["Water"],
        origem:
          "Ovos de 5 km, Passe GO e Liga de Batalha (Rank 16+). Muda de forma em batalha.",
      },
    ],
    dica:
      "priorizar doce de Arrokuda — linha mais difícil de completar depois do evento.",
  },
  bonusPoeira: {
    janelas: [
      {
        janela: "18/08 (ter) 10h → 20/08 (qui) 10h",
        xp: "2×",
        poeira: "3×",
      },
      {
        janela: "20/08 (qui) 10h → 22/08 (sáb) 10h",
        xp: "3×",
        poeira: "4×",
      },
      {
        janela: "22/08 (sáb) 10h → 24/08 (seg) 20h",
        xp: "4×",
        poeira: "5×",
        pico: true,
      },
    ],
    dica: "use Fragmento Estelar na janela de 5× — o multiplicador chega a 10×.",
  },
  encontros: [
    { nome: "Psyduck", tipos: ["Water"], nota: "Com boia", shiny: true },
    { nome: "Feebas", tipos: ["Water"], nota: "Raro" },
    { nome: "Clamperl", tipos: ["Water"], nota: "Raro" },
    { nome: "Ducklett", tipos: ["Water", "Flying"], nota: "Shiny turbinado", shiny: true },
    { nome: "Dewpider", tipos: ["Water", "Bug"], nota: "Shiny turbinado", shiny: true },
  ],
  reides: [
    {
      nivel: "Nível 1",
      chefes: [{ nome: "Arrokuda", tipos: ["Water"] }],
    },
    {
      nivel: "Nível 3",
      chefes: [
        { nome: "Dondozo", tipos: ["Water"] },
        { nome: "Samurott de Hisui", tipos: ["Water", "Dark"] },
        { nome: "Lapras", tipos: ["Water", "Ice"] },
      ],
    },
  ],
  notaCuradoria: {
    texto:
      "Segure os fortalecimentos pendentes (Raikou, Gengar, Tyranitar 3 Stars) até a janela de 5× em 22–24/08. Com Fragmento Estelar, cada nível sai pela metade do custo relativo.",
    linkPlano: true,
  },
};
