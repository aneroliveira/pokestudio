# RFC-004 — Navegação Anterior/Próxima no card do Pokémon

Status: Implementada (30/09/2026) — ordem nacional, barra própria com nome
do vizinho (`components/pokemon/NavegacaoVizinhos.tsx`), só na Home. Admin
fica pra depois.
Autor: Lori (ideia) + Claude (viabilidade e plano)
Data: 30/09/2026
Objetivo: Deixar a pessoa passear pela Pokédex inteira sem voltar pra busca —
ao abrir um Pokémon, dá pra ir direto pro anterior/próximo (ordem nacional),
igual folhear.

---

## Contexto

Pedido original: ao clicar num Pokémon e abrir o card com as informações
estratégicas, ter botões "anterior" / "próxima" pra navegar sem precisar
voltar pra busca ou pra grade da Pokédex (`/` → aba Pokédex, ver RFC da
grade em `components/pokemon/PokedexGrid.tsx`).

Esta RFC registra a viabilidade (✅ confirmada, baixa complexidade) e o
desenho proposto, pra implementar depois — sem código ainda.

---

## Viabilidade

**Confirmada. Esforço pequeno, sem mudança de modelo nem de dados.**

O índice inteiro (`data/pokemonIndex.json`, 1025 entradas, gerado por
`scripts/gerarIndice.ts`) já vem **ordenado por número nacional** — cada
item é `{ id, numero, nomeEn }` (`models/indice.ts`). Achar "quem vem antes/
depois" do Pokémon aberto é só:

1. Achar a posição do item atual no índice (por `numero`, que é o único
   campo que o card mostra e que também identifica o registro de curadoria
   em `data/studio.json` — ver `pokemon.oficial.numero` em
   `models/pokemonOficial.ts`).
2. Pegar `indice[posição - 1]` e `indice[posição + 1]` — já são
   `ItemIndicePokemon` prontos, sem precisar montar nada à mão.

Isso já tem precedente direto no código: `PokemonEvolutions.tsx` (linhas
304–313) monta um `ItemIndicePokemon` sintético pra navegar até uma
evolução, com `id: 0` de placeholder — funciona porque `montarPokemon`
(`services/pokemon/montarPokemon.ts`) só usa `nomeEn` (pra buscar na
PokéAPI) e `numero` (pra achar a curadoria local); o `id` do índice não é
usado no carregamento, só em miniaturas (`obterSpritePokemon(item.id)` na
grade da Pokédex e na busca). Pra anterior/próxima isso fica **mais simples
ainda** que a evolução: os vizinhos já são itens reais do índice, não
precisa sintetizar nada.

A função que já existe pra abrir qualquer Pokémon (`selecionarPokemon` em
`app/page.tsx`) já serve sem alteração — é a mesma que a busca, os chips de
recentes e a grade da Pokédex chamam. Não tem lógica de carregamento nova
pra escrever, só descobrir *quais* itens passar pra ela.

---

## O que falta decidir (perguntas pra Lori antes de implementar)

1. **Ordem de navegação.** Duas opções:
   - **Ordem nacional simples** (recomendado) — sempre anterior/próximo por
     número de Pokédex, ignorando de onde a pessoa veio. Mais previsível, e
     é a leitura mais natural de "anterior/próxima" num contexto de
     Pokédex.
   - **Ordem contextual** — se abriu pela grade da Pokédex, navega dentro
     da região atual; se abriu pela busca, navega pelos resultados da
     busca. Mais rico, bem mais complexo (precisa carregar o "de onde
     vim" e cada origem tem sua própria noção de "lista"), e o
     comportamento fica menos previsível pra quem só quer "o próximo da
     Pokédex". Não recomendo pra uma primeira versão.

2. **Onde os botões aparecem.** No rascunho enviado, as setas estavam
   desenhadas em cima da fila de chips "Recentes" — não é ali que elas
   devem morar (essa fila é histórico, não teria como estar sempre
   alinhada com "anterior/próxima" do Pokémon aberto). Duas opções mais
   coerentes com o layout atual do card:
   - Ao lado do número (`#003`) no topo do `PokemonHeader.tsx` — duas setas
     pequenas, compactas, perto da informação que elas already mudam.
   - Uma barra própria no topo ou rodapé do `PokemonCard.tsx`, com nome do
     vizinho ao lado da seta (ex.: "← Ivysaur" / "Charmeleon →"), no
     mesmo espírito do "Ir direto pro tipo" de `/atacantes` ou do carrossel
     de eventos (`EventoNavRapida.tsx`).

3. **Onde a navegação aparece.** `PokemonCard` é usado na Home (`/`) e no
   Admin (`/admin`) — `PokemonPocketCard` (usado em `/pocket`) é um
   componente separado e não ganha o recurso de graça. Vale nos dois
   lugares (o Admin também se beneficiaria, pra curar registros seguidos
   sem voltar pra lista), ou só na Home?

---

## Plano de implementação (quando for pra frente)

| Peça | Onde |
|---|---|
| Achar vizinhos por `numero` | Novo helper em `services/pokemon/buscarPokemon.ts`, ex. `buscarVizinhos(numero: string): { anterior?: ItemIndicePokemon; proximo?: ItemIndicePokemon }` — usa o mesmo `INDICE` já importado ali, `findIndex` por `numero` |
| Botões de navegação | `PokemonHeader.tsx` (ou um componente novo, `PokemonNavegacaoSequencial.tsx`, se a barra separada for a escolha) |
| Fiação até `selecionarPokemon` | `PokemonCard` já recebe `onSelecionarPokemon` (usado hoje só pelas evoluções) — os botões de anterior/próxima reaproveitam essa mesma prop, sem precisar de uma nova |
| Bordas do índice | Esconder ou desabilitar o botão quando não há vizinho (`#001` sem anterior, `#1025` sem próxima) |

Nenhuma migração de dado, nenhuma mudança de schema. O trabalho é
essencialmente UI + um `findIndex`.

---

## Impacto

🟢 Baixo. Não toca `data/studio.json`, não muda `models/`. Reaproveita
100% da função de carregamento existente.

---

## Pendências

- Decidir as 3 perguntas acima antes de escrever código.
- Se a ordem contextual for escolhida no futuro, precisa de um jeito de
  a Home saber "de onde" o Pokémon foi aberto (provavelmente um estado a
  mais em `app/page.tsx`, guardando a última lista usada pra seleção).
