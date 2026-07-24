# RFC-002 — Domínio de Megas / "Melhor Mega"

Status: Em andamento
Autor: Lori
Objetivo: Responder *"Qual Mega usar contra este Pokémon?"* sem violar as regras da RFC-001.

---

## Contexto

A RFC-001 deixou o domínio pronto para escalar (PvP, Raids, Megas, Dynamax). A
primeira frente escolhida é **Megas**, por ser a mais alinhada à visão do produto
(*"Qual Mega utilizar contra ele?"* aparece na [vision](vision.md) e no roadmap
v0.3.0 "Melhor Mega") e por já ter fundação parcial no domínio.

### Fundação atual (propositalmente fraca)

- `FormaPokemon` guarda apenas `{ id, categoria }` — Mega é um **rótulo de forma**,
  sem tipo e sem stats.
- `constants/typeChart.ts` tem apenas **relações defensivas** (`RELACOES_DEFENSIVAS`).
  Não existe efetividade **ofensiva**.
- O gerador `gerarGoStats.ts` cobre só formas base; por isso havia a impressão de
  que "Megas não têm base stats".

### Fonte confirmada

O mirror `pokemon-go-api` (`.../api/pokedex/id/{id}.json`), já usado por goStats,
traz por Pokémon:

- `hasMegaEvolution: boolean`
- `megaEvolutions: { <ID>: { names, stats {attack,defense,stamina}, primaryType,
  secondaryType, energyCost, assets } }`

Ou seja, o roster de Megas **com tipos e stats** é 100% obtível. (Tipos vêm como
`POKEMON_TYPE_FIRE` → mapear para `TipoPokemon`.)

---

## Decisões de arquitetura

1. **Roster de Megas:** gerado do **mirror pokemon-go-api** via script
   (`npm run gen:megas` → `data/megas.json`), no mesmo espírito de goStats.
   Re-sincronizável, automático. É **dado oficial/externo**, nunca curadoria.
2. **Efetividade ofensiva:** **derivada** por inversão de `RELACOES_DEFENSIVAS`.
   Nenhuma tabela ofensiva persistida à parte — o typeChart defensivo é a única
   fonte de verdade. (Regra RFC-001: derivados sempre calculados, nunca persistidos.)

---

## Escopo

**Foco (B):** recomendar o melhor Mega **contra** o Pokémon exibido.

**Bônus barato (A):** *"vale a Mega dele?"* (curadoria) — habilitado depois, não é o alvo.

**Fora do v1:** PvP, Dynamax, ranking por dano exato (movesets/CPM), UI além do card.
O ranking v1 usa **efetividade de tipo** (os stats das Megas ficam guardados no
`megas.json` para um upgrade futuro de ranking por dano real).

---

## Etapas (checkpoint entre cada)

| Etapa | Entrega | Custo | Risco |
|-------|---------|-------|-------|
| **1** | Helper de **efetividade ofensiva** derivado do typeChart. Isolado, testável, não muda comportamento. | baixo | baixo |
| **2** | `scripts/gerarMegas.ts` (`npm run gen:megas`) → `data/megas.json`: `{ nome, tipos, categoria, stats }`. Mapa `POKEMON_TYPE_*` → `TipoPokemon`. | médio | baixo |
| **3** | `services/pokemon/recomendarMega.ts`: dado os tipos do alvo, ranqueia Megas por efetividade ofensiva. Derivado, nunca persistido. | médio | médio |
| **4** *(rodada separada)* | UI "Melhor Mega" no card/detalhes. | médio | — |

---

## Regras arquiteturais (herdadas da RFC-001)

- Efetividade e ranking são **calculados em runtime**, nunca persistidos.
- O roster de Megas é **dado oficial** (como PokéAPI/goStats), fora do domínio `studio`.
- `constants/typeChart.ts` permanece a única fonte de verdade das relações de tipo.
