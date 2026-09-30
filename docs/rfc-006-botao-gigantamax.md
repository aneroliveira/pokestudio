# RFC-006 — Botão Gigantamax no card do Pokémon

Status: Implementada (30/09/2026). Ícones em `public/icones/`: shiny e Mega
do PokeMiners/pogo_assets (`Images/Pokedex/ic_shiny.png`,
`Images/Menu Icons/ic_mega.png`), Gigamax da wiki do Pokémon GO (Fandom,
`Icon_Gigantamax_Pokémon.png`, baixado pela Lori e convertido de WebP pra
PNG). O ícone de Gigamax é o símbolo Max (um "X" magenta), não um "G".
Autor: Lori (ideia) + Claude (viabilidade e plano)
Data: 30/09/2026
Objetivo: Ao lado dos botões ✨ Shiny e 💠 Mega do card, ter um botão de
Gigantamax que troca a imagem pela forma Gigantamax, do mesmo jeito que os
outros dois já fazem.

---

## Contexto

Hoje os cards (ficha completa em `PokemonHeader.tsx` e ficha rápida em
`PokemonPocketCard.tsx`) têm dois botões que só mudam a imagem:

- **Shiny**: troca pela arte shiny (`pokemon.oficial.imagemShiny`).
- **Mega**: troca pela Mega (ou Megas X/Y lado a lado), vinda de
  `data/megas.json`. Combina com o Shiny (Mega shiny).

A lógica dos dois fica num lugar só, o hook `useMegaShiny.ts`, que os dois
cards usam. Então um botão novo que entre no hook aparece nos dois cards
(e no Admin, que usa o mesmo `PokemonCard`) sem duplicar código.

---

## Viabilidade

**Confirmada, e com a mesma fonte que já usamos para as Megas.**

O mirror `pokemon-go-api` (`api/pokedex.json`, a mesma fonte de
`scripts/gerarMegas.ts`) traz, por espécie:

- `hasGigantamaxEvolution: true`: hoje são **16 espécies**: Venusaur,
  Charizard, Blastoise, Butterfree, Meowth, Machamp, Gengar, Kingler,
  Lapras, Snorlax, Garbodor, Rillaboom, Cinderace, Inteleon, Toxtricity e
  Grimmsnarl.
- Em `assetForms`, uma entrada `form: "GIGANTAMAX"` com imagem normal e
  shiny, no mesmo padrão de arquivo das Megas
  (`pm6.fGIGANTAMAX.icon.png` / `pm6.fGIGANTAMAX.s.icon.png`).

Continua valendo a regra da RFC-002: o roster é dado oficial/externo,
gerado por script, nunca curadoria à mão no `studio.json`.

---

## Decisão proposta

1. **Dados:** novo script `scripts/gerarGigantamax.ts` gerando
   `data/gigantamax.json`, uma entrada por espécie:
   `{ numeroBase, nome, imagem, imagemShiny, escala }`.
   - Confere se cada imagem existe de verdade (HEAD), igual ao
     `resolverImagens` das Megas, e só guarda a que existe.
   - Mede a `escala` da arte, igual ao `medirEscala` das Megas (os ícones do
     GO têm margem diferente da arte oficial da forma base).
   - As funções de imagem e escala que hoje estão dentro de
     `gerarMegas.ts` vão para um arquivo compartilhado entre os dois
     scripts, em vez de copiadas.
2. **Serviço:** `services/pokemon/gigantamax.ts` exporta a lista
   (`GIGANTAMAX`), no mesmo espírito do `MEGAS` de `recomendarMega.ts`.
3. **Hook:** `useMegaShiny` ganha `mostrarGigantamax` / `temGigantamax`.
   Como passa a cuidar de três formas, vale renomear para
   `useFormasVisuais` (só o nome muda para quem usa).
4. **Botão:** um `ToggleChip` "Gigamax" a mais nos dois cards, logo depois
   do Mega, e só aparece nas 16 espécies com Gigantamax.
5. **Regras de combinação:**
   - Shiny + Gigantamax: combina (Gigantamax shiny), igual Shiny + Mega.
   - Mega + Gigantamax: **não combinam** (não existe uma forma que seja as
     duas). Ligar um desliga o outro. Afeta só Venusaur, Charizard,
     Blastoise e Gengar, que têm os dois botões.

### Fora do escopo

- Batalhas Max / ranking de Gigantamax (o equivalente à seção "Melhor Mega"
  da RFC-002). Fica para outra RFC, se fizer sentido.
- Ataques G-Max e stats da forma Gigantamax.
- Dinamax (a forma Dinamax é só o Pokémon maior, sem arte própria).

---

## Plano de implementação

| Peça | Onde |
|---|---|
| Helpers de imagem/escala compartilhados | Novo `scripts/assetsGO.ts` (tirado de `gerarMegas.ts`) |
| Roster | `scripts/gerarGigantamax.ts` → `data/gigantamax.json` |
| Lista para a UI | `services/pokemon/gigantamax.ts` |
| Estado e imagens | `components/pokemon/useMegaShiny.ts` → `useFormasVisuais.ts` |
| Botão | `PokemonHeader.tsx` e `PokemonPocketCard.tsx` |

Nenhuma mudança em `models/` nem em `data/studio.json`.

---

## Impacto

🟢 Baixo. Um JSON novo gerado por script, um botão a mais e uma regra a
mais no hook. Os cards das espécies sem Gigantamax não mudam.

---

## Decisões (Lori, 30/09/2026)

1. **Nome no botão:** "Gigamax".
2. **Ícone:** o "G" do ícone real do jogo; se não der, 🔴 (a energia Max).
3. **Espécies:** segue o mirror, as 16.

---

## Melhoria junto: ícones do jogo nos três botões

Pedido: trocar os emojis (✨ Shiny, 💠 Mega) pelos ícones que o próprio
Pokémon GO usa (o brilho de shiny, o símbolo de Mega e o "G" de
Gigantamax), e o botão novo já nasce assim.

- **Origem dos ícones: em aberto.** O repositório de imagens do mirror
  (`pokemon-go-api/assets`) só tem artes de Pokémon, sem ícones de
  interface. Falta achar uma fonte confiável dos três ícones.
- **Plano B:** desenhar os três como SVG no próprio projeto, inspirados
  nos do jogo (brilho, símbolo de Mega e um "G" em círculo vermelho). Não
  depende de fonte externa e segue a cor do tema, claro ou escuro.
- **Onde:** um componente `IconeForma` (`shiny` | `mega` | `gigamax`)
  usado nos `ToggleChip` de `PokemonHeader.tsx` e `PokemonPocketCard.tsx`.
- Se o "G" não sair bem, o Gigamax usa 🔴, como decidido acima.
