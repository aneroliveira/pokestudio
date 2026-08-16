# RFC-003 — Plano de Coleção (`/plano`)

Status: Implementada
Autor: Lori
Data: 16/08/2026
Objetivo: Dar um lugar no produto para a curadoria que descreve **a bolsa inteira**,
não um Pokémon por vez.

---

## Contexto

Até aqui o PokéStudio tem um eixo só: **um Pokémon por vez**. A busca abre um card,
o card lê `data/studio.json` indexado por `#numero`, e o Admin edita esse mesmo
registro. Toda a arquitetura assume essa chave.

A curadoria de atacantes de reide (auditoria de 16/08/2026) não cabe nesse eixo.
Ela responde a outra pergunta:

> "Tenho 694.949 de poeira e a bolsa cheia. O que eu faço **primeiro**?"

São coisas que não pertencem a nenhum Pokémon isolado:

- ordem de execução com progresso,
- orçamento de poeira e qual é o gargalo,
- estado de cobertura por tipo (quem é o titular de cada um),
- o sistema de etiquetas `RAID-*` e a tabela chefe → etiqueta,
- armadilhas aprendidas durante a varredura.

E pior: **a mesma espécie aparece em papéis diferentes**. O Tyranitar sortudo carrega
a mega; o Tyranitar 3 Stars é o atacante de linha. Dois destinos, um `#248`.

---

## Alternativas consideradas

1. **Uma aba no Admin.** Descartada: o Admin é um editor de *um* registro, chaveado
   por número (`usePokemonEditor`). O plano não tem chave de Pokémon.
2. **Quebrar tudo em `observacoes` / `decisoes` no `studio.json`.** Descartada como
   solução única: os itens de Pokémon específico até caberiam, mas a visão de
   conjunto (ordem, orçamento, cobertura) não tem onde morar e se perderia.
3. **Só um `.md` em `docs/`.** Descartada: vira documento, não ferramenta. Não dá
   para marcar progresso em pé na rua, na frente de um ginásio.
4. **Rota própria `/plano`.** ✅ Escolhida.

---

## Decisão

Um **novo domínio `plano`**, paralelo ao `studio`, com rota própria.

| Camada | Arquivo |
|--------|---------|
| Modelo | `models/plano.ts` |
| Dados | `data/plano.json` |
| Rota de dados | `app/api/plano/route.ts` (GET + PATCH) |
| Service | `services/plano/planoStore.ts` |
| UI | `app/plano/page.tsx` + `components/plano/*` |

### Regras

- **O plano não é indexado por número.** Ao contrário do `studio`, a chave não existe:
  cada entrada é um *exemplar em um papel*, e a mesma espécie pode repetir.
  `numero` e `nomeEn` ficam em cada entrada apenas para resolver sprite e link.
- **Só a ordem de execução é mutável.** O `PATCH` alcança exclusivamente
  `ordemExecucao[].concluido`. Auditoria, etiquetas e aprendizados são curadoria
  manual, editada direto no JSON — mesmo espírito do `studio.json`.
- **Nada é derivado aqui.** A tabela chefe → etiqueta é *curadoria*, não cálculo de
  `typeChart`: ela responde "qual etiqueta eu digito na lupa", que depende de quem
  a Lori realmente tem etiquetado, não da efetividade teórica. Se um dia virar
  cálculo, é outra RFC.
- **Etiqueta ≠ rótulo de tipo.** `RAID-TERRESTRE` é o texto literal digitado dentro
  do Pokémon GO; `TIPO_LABEL[Ground]` é `"Terra"`. Os dois convivem de propósito, e
  a etiqueta nunca passa pela camada de tradução.

### Ponte com o domínio `studio`

O plano diz **o que fazer**; o card diz **por quê**. Para ligar os dois, a Home
passou a aceitar `/?p=<slug>`, que abre o card já montado — é o destino de toda
linha de Pokémon do plano. O parâmetro é lido do `window.location` dentro do efeito
que já existia, e não via `useSearchParams`, para não exigir um boundary de
`Suspense` por causa de um parâmetro opcional.

---

## Impacto

🟢 Baixo. Nenhum arquivo do domínio `studio` mudou de forma; a Home ganhou um
caminho de entrada a mais e `buscarPokemon.ts` ganhou `buscarPorNomeEn`.

---

## Pendências

- **Numeração de RFC em conflito.** Existem duas séries: a inline em
  `architecture.md` (RFC-001 a RFC-006, de 11/07/2026) e a de arquivo
  (`rfc-002-megas.md`). Esta RFC segue a série de arquivo. Vale unificar.
- Os itens de Pokémon específico do plano (movesets-alvo, "não purificar o Timburr",
  "não fortalecer Reshiram/Zekrom") ainda **não** aparecem no card do Pokémon.
  Levá-los para `observacoes` / `decisoes` no `studio.json` é trabalho separado.
