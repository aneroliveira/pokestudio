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
| Curadoria | `data/plano.json` |
| Rota de dados | `app/api/plano/route.ts` (GET, somente leitura) |
| Service | `services/plano/planoStore.ts` |
| UI | `app/plano/page.tsx` + `components/plano/*` |

### Regras

- **O plano não é indexado por número.** Ao contrário do `studio`, a chave não existe:
  cada entrada é um *exemplar em um papel*, e a mesma espécie pode repetir.
  `numero` e `nomeEn` ficam em cada entrada apenas para resolver sprite e link.
- **Curadoria e progresso são coisas separadas.** A curadoria (auditoria, etiquetas,
  aprendizados) é editada no JSON e commitada. O progresso do checklist — a única
  coisa que muda durante o uso — é um JSON próprio (`ProgressoPlano`,
  `passoId → concluído`) guardado no navegador. Ver *Correção* abaixo.
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

## Correção — persistência do progresso

A primeira versão gravava `ordemExecucao[].concluido` de volta no `data/plano.json`
via `PATCH`, espelhando o que o Admin faz com o `studio.json`. **Funcionava em
`next dev` e quebrava no ar.**

Em hospedagem serverless (Vercel, o alvo do projeto) o sistema de arquivos é
somente leitura: o `writeFile` estoura com `EROFS` e o `PATCH` devolve 500. O
sintoma era enganoso — os passos já marcados apareciam normalmente, porque vinham
do JSON commitado, e só a gravação de um passo novo falhava.

O `writeFile` de curadoria do `studio.json` tem o mesmo limite, mas ali é aceitável:
o Admin é ferramenta de bancada, usada na máquina de desenvolvimento. O checklist
do plano é o oposto — o uso previsto é no celular, em pé na frente de um ginásio,
que é exatamente onde só existe a versão publicada.

**Decisão:** o `PATCH` foi removido (a rota é `GET` puro) e o progresso passou a ser
um JSON no `localStorage`, sob a chave `pokestudio:plano:progresso`.

- O `concluido` do `plano.json` vira o **estado inicial** — o que a auditoria
  registrou como já feito.
- O progresso do aparelho **se sobrepõe** a ele. A checagem é por *presença da
  chave*, não pelo valor, para que desmarcar um passo que veio marcado do JSON
  funcione e sobreviva ao reload.
- `salvarProgresso` devolve `false` quando o armazenamento não está disponível
  (janela anônima, cota cheia), e a UI avisa em vez de fingir que salvou.

Nota de implementação: o progresso vive numa `ref`, não em `useState`. Dois toques
seguidos acontecem antes do React re-renderizar, e um closure com o valor antigo
fazia o segundo apagar o primeiro.

---

## Correção 2 — progresso compartilhado entre aparelhos

O `localStorage` resolveu o erro, mas o progresso ficava preso ao aparelho: marcar
no celular não aparecia no PC. Para um plano que existe justamente para ser seguido
na rua e revisado em casa, isso é uma limitação de fundo, não de conforto.

**Decisão:** o progresso passou a viver no **Vercel Blob**, em
`plano/progresso.json`. Continua sendo um JSON — a RFC-006 segue de pé, o projeto
não ganhou banco relacional.

| Detalhe | Escolha | Por quê |
|---|---|---|
| `access` | `private` | O blob não é servido por URL pública; só a rota o lê, com o token do projeto. |
| `useCache: false` na leitura | sempre | O CDN do Blob tem cache **mínimo de 1 minuto**. Com cache, "marquei no celular" demoraria a aparecer no PC — justamente o problema que a mudança resolve. |
| Escrita | mescla, não substitui | A rota lê o estado atual e aplica as chaves recebidas por cima. Um passo marcado por outro aparelho sobrevive a uma gravação que não o conhecia. |
| Gravações no cliente | serializadas numa fila | Dois toques rápidos viravam dois `PUT` concorrentes, e o que chegasse por último decidia — podendo ser o que carregava o valor mais antigo. |

### Escrita protegida por senha

O produto não tem login (decisão de 11/07/2026) e a URL é pública, então um endpoint
de escrita aberto deixaria qualquer um mexer no checklist. A proteção é uma senha
única em `PLANO_SENHA`, enviada no header `x-plano-senha`.

- Sem senha válida, a página abre em **modo leitura** e os checkboxes ficam
  desabilitados. Deixar marcar sem sincronizar seria pior: o aparelho mentiria em
  silêncio.
- A comparação usa `timingSafeEqual` sobre digests SHA-256 — digests têm tamanho
  fixo, então senhas de comprimentos diferentes não quebram a função nem vazam o
  tamanho pelo tempo de resposta.
- Se `PLANO_SENHA` não estiver configurada, a escrita é **recusada** (503). O padrão
  seguro é travar, não abrir por esquecimento.
- A senha só é guardada no navegador **depois** que o servidor aceitou, para a página
  não reabrir travada por causa de uma senha errada memorizada.

### Cache local, agora como rede de segurança

O `localStorage` continua, mas mudou de papel: deixou de ser a fonte de verdade e
virou cache. A página abre com o último estado conhecido sem esperar rede, e se o
servidor não responder ela avisa (`Sem conexão com o servidor`) em vez de fingir que
salvou.

### Configuração necessária

Ver `.env.example`. Sem `BLOB_READ_WRITE_TOKEN` a leitura devolve 503 e a página
entra em modo offline — funciona, mas não sincroniza.

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
