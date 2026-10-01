# RFC-006 — Botão Gigantamax no card do Pokémon

Status: Implementada (30/09/2026, commit `cdb82de`)
Autor: Lori (ideia e decisões de visual) + Claude (viabilidade, plano e código)
Data: 30/09/2026
Objetivo: Ao lado dos botões Shiny e Mega do card, ter um botão Gigamax que
troca a imagem pela forma Gigantamax, do mesmo jeito que os outros dois já
faziam. Junto, trocar os emojis dos botões pelos ícones do próprio jogo.

---

## Contexto

Os cards (ficha completa em `PokemonHeader.tsx` e ficha rápida em
`PokemonPocketCard.tsx`) tinham dois botões que só mudam a imagem:

- **Shiny**: troca pela arte shiny (`pokemon.oficial.imagemShiny`).
- **Mega**: troca pela Mega (ou Megas X/Y lado a lado), vinda de
  `data/megas.json`. Combina com o Shiny (Mega shiny).

A lógica dos dois ficava num lugar só, o hook `useMegaShiny.ts`, usado pelos
dois cards. Por isso o botão novo entrou no hook e aparece nos dois cards (e
no Admin, que usa o mesmo `PokemonCard`) sem duplicar código.

---

## Fonte dos dados

O mirror `pokemon-go-api` (`api/pokedex.json`, a mesma fonte de
`scripts/gerarMegas.ts`) traz, por espécie:

- `hasGigantamaxEvolution: true`: **16 espécies**: Venusaur, Charizard,
  Blastoise, Butterfree, Meowth, Machamp, Gengar, Kingler, Lapras, Snorlax,
  Garbodor, Rillaboom, Cinderace, Inteleon, Toxtricity e Grimmsnarl.
- Em `assetForms`, uma entrada `form: "GIGANTAMAX"` com imagem normal e
  shiny, no mesmo padrão de arquivo das Megas
  (`pm6.fGIGANTAMAX.icon.png` / `pm6.fGIGANTAMAX.s.icon.png`).

Vale a regra da RFC-002: o roster é dado oficial/externo, gerado por script,
nunca curadoria à mão no `studio.json`. Por isso aparecem as 16 do mirror,
sem filtro manual de "já lançadas".

---

## Como ficou

### Dados

- `scripts/gerarGigantamax.ts` gera `data/gigantamax.json`, uma entrada por
  espécie: `{ numeroBase, nome, imagem, imagemShiny, escala }`. Formas da
  mesma espécie (ex.: Toxtricity Amped/Low Key) viram uma entrada só.
- As funções de imagem e escala saíram de `gerarMegas.ts` para
  `scripts/assetsGO.ts`, usado pelos dois scripts:
  - `resolverImagensForma`: confere com HEAD se o ícone por forma existe e só
    usa o que existe.
  - `medirEscala`: mede a margem do ícone do GO pra igualar à arte oficial.
- Validação da refatoração: rodar `gerarMegas.ts` de novo deu o mesmo
  `megas.json`, a não ser por uma Mega nova no mirror (Mega Staraptor), que
  entrou num commit separado (`c891c84`).
- `services/pokemon/gigantamax.ts` exporta a lista (`GIGANTAMAX`), no mesmo
  espírito do `MEGAS` de `recomendarMega.ts`.

### Estado e regras

`useMegaShiny.ts` virou `components/pokemon/useFormasVisuais.ts`, com
`alternarShiny` / `alternarMega` / `alternarGigamax` e `temGigamax`.

- Shiny + Gigamax: combina (Gigamax shiny), igual Shiny + Mega.
- Mega + Gigamax: **não combinam** (não existe forma que seja as duas).
  Ligar um desliga o outro. Afeta Venusaur, Charizard, Blastoise e Gengar.

### Botões

- Nome: **"Gigamax"** (o nome no jogo em português, o mesmo do FAQ).
- `components/pokemon/BotaoForma.tsx`: um chip por forma, usado nas duas
  fichas, em cima do `ToggleChip` (que ganhou `rotulo`, usado como dica ao
  passar o mouse e nome pro leitor de tela).
- **Celular:** só o ícone. **Computador (a partir de `sm`):** ícone + nome.
- O botão só aparece nas espécies que têm a forma (Pikachu, por exemplo,
  continua só com o Shiny).

### Ícones (`public/icones/`, via `components/pokemon/IconeForma.tsx`)

| Ícone | Origem | Como aparece |
|---|---|---|
| `shiny.png` | PokeMiners/pogo_assets, `Images/Pokedex/ic_shiny.png` | Usado como máscara, pintado de **amarelo** (`yellow-500` / `yellow-400` no escuro) |
| `mega.png` | PokeMiners/pogo_assets, `Images/Menu Icons/ic_mega.png` | Original do jogo: "S" escuro sobre círculo de arco-íris |
| `gigamax.png` | Wiki do Pokémon GO (Fandom), `Icon_Gigantamax_Pokémon.png` | Original: o símbolo Max, um "X" magenta (não um "G") |

O arquivo da wiki veio em WebP com nome `.png` (baixado pela Lori, porque a
wiki bloqueia download automático) e foi convertido pra PNG de 128×128. O
PokeMiners não tem ícones de Gigantamax/Dinamax.

### Layout: Megas X/Y sem mexer nos chips

Com duas Megas (X/Y) lado a lado, a coluna do nome estreitava e os chips
quebravam de linha. Ficou assim:

- **Ficha completa:** os chips de forma saíram do lado do nome e ganharam uma
  linha própria logo abaixo dele, sem quebra (`flex-nowrap`).
- **Ficha rápida:** a coluna dos chips + CPs não encolhe nem quebra a partir
  de `sm`; quem cede espaço é o bloco de nome/tipos.
- **Celular, ficha completa:** as duas Megas empilham (as duas grandes não
  cabem ao lado do nome; lado a lado, a Mega X ficava por cima dele).
- Medido no Charizard, Mega desligada e ligada, em 375, 640 e 1100px: os
  três chips ficam exatamente na mesma posição, sem nada estourar o card.

### Ficha rápida: CPs sem legenda

As legendas "Nv. 20 · Raid e Ovo" / "Nv. 25 · Raid com clima" saíram. Ficam
só ☁️ e ☀️ com o CP (21px); a explicação dos níveis está na seção Hundos da
ficha completa, e o CP ganhou uma dica ao passar o mouse.

---

## Testado e descartado

- **Ícone do Mega com o "S" em branco:** ficou estranho; voltou o original.
- **Botões só com ícone, sem borda de chip** (desligado cinza e apagado,
  ligado colorido): não agradou; voltou o chip com borda.
- **Botões sem nome também no computador:** ficou só no celular.
- **Empilhar as Megas X/Y também no computador:** a preferência é lado a
  lado; o problema dos chips foi resolvido no layout (ver acima).
- **Novas legendas pros CPs da ficha rápida** ("100% reide/ovo" /
  "100% c/ clima" e "Reide e ovo" / "Reide c/ clima"): nenhuma foi melhor
  que tirar a legenda.
- **CPs da ficha rápida em 19px:** voltou pra 21px.

---

## Fora do escopo

- Batalhas Max / ranking de Gigantamax (o equivalente à seção "Melhor Mega"
  da RFC-002). Fica para outra RFC, se fizer sentido.
- Ataques G-Max e stats da forma Gigantamax.
- Dinamax (a forma Dinamax é só o Pokémon maior, sem arte própria).

---

## Impacto

🟢 Baixo. Um JSON novo gerado por script, um chip a mais e uma regra a mais
no hook. Nenhuma mudança em `models/` nem em `data/studio.json`. Mudou o
visual dos chips de forma nas duas fichas (ícones do jogo e, na completa, a
linha própria abaixo do nome).

---

## Pendências

- Quando o mirror ganhar novas Gigantamax, rodar
  `npx tsx scripts/gerarGigantamax.ts` (o mesmo vale pras Megas com
  `gerarMegas.ts`).
- O `ToggleChip` hoje só é usado pelos chips de forma (via `BotaoForma`).
