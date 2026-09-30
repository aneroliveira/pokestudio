# RFC-005 — Pocket dentro da Home (visualização Completa / Rápida)

Status: Aprovada e implementada (30/09/2026).
Autor: Lori (ideia) + Claude (análise e plano)
Data: 30/09/2026
Objetivo: Ter um lugar só pra consultar Pokémon. A ficha rápida da `/pocket`
vira um modo de visualização da Home, e não uma página separada.

---

## Contexto

Hoje existem duas páginas que fazem quase a mesma coisa:

| | Home (`/`) | Pocket (`/pocket`) |
|---|---|---|
| Entrada | Busca com lista de sugestões → escolhe **um** | Busca "ao vivo" → mostra **todos** os resultados |
| Card | `PokemonCard` (ficha completa: ações, hundos, evoluções…) | `PokemonPocketCard` (imagem, tipos, fraquezas, CP 100%) |
| Recentes | Chips → abre o Pokémon | Chips → preenche a busca |
| Pokédex (grade) | ✅ aba própria | ❌ |
| Anterior/próximo (RFC-004) | ✅ | ❌ |

As duas usam a mesma busca (`buscarPokemon`), os mesmos recentes
(`lerRecentes`/`adicionarRecente`) e a mesma montagem (`montarPokemon` +
`studioDoMapa`). A diferença real está só **no quanto de detalhe o card
mostra**. Ter duas páginas obriga a pessoa a saber que "Home" e "Pocket"
são coisas diferentes, e o nome do menu não explica isso.

Pedido original: colocar a `/pocket` como aba na Home, ao lado da Pokédex.

---

## Decisão proposta

**Não é uma terceira aba. É um seletor de visualização.**

As abas atuais respondem *"como eu acho o Pokémon"* (Buscar / Pokédex). A
Pocket responde *"como eu quero ver o Pokémon"*. Colocar as duas na mesma
fila de abas mistura os dois eixos e deixa perguntas sem resposta (clicar
na grade da Pokédex abre qual ficha? A barra de anterior/próximo existe na
Pocket?).

Então:

- Abas continuam `Buscar | Pokédex`.
- Um seletor pequeno **Completa / Rápida** fica na mesma linha dos chips de
  recentes, à direita (aparece só com um Pokémon aberto).
- **Completa** = comportamento atual da Home (um Pokémon, `PokemonCard`,
  barra de anterior/próximo).
- **Rápida** = `PokemonPocketCard` do Pokémon aberto, com a mesma barra de
  anterior/próximo. Pokédex, recentes e busca abrem direto nesse modo.
- A escolha fica salva no `localStorage` (conveniência por navegador, igual
  aos recentes). Se o storage falhar, o padrão é Completa.

### E a busca "ao vivo" com vários resultados da Pocket?

É a única coisa da Pocket que não se encaixa de graça: a Home espera você
escolher um resultado, a Pocket mostra todos enquanto você digita. Na POC,
o modo Rápida **segue o fluxo da Home** (escolhe um e abre). Se fizer falta
ver a família inteira de uma vez ("char" → Charmander, Charmeleon,
Charizard), dá pra somar depois uma lista de fichas rápidas das sugestões,
mas isso fica fora do escopo da primeira versão.

---

## Plano de implementação (POC)

| Peça | Onde |
|---|---|
| Seletor Completa / Rápida | `app/page.tsx`, na linha dos chips de recentes, com o mesmo visual de segmento do "Resumo / Caçada" dos Hundos |
| Guardar a escolha | `localStorage` com try/catch, lido num efeito (mesmo padrão dos recentes) |
| Renderizar o card | `pokemonSelecionado` → `PokemonCard` ou `PokemonPocketCard` conforme o modo; a `NavegacaoVizinhos` fica acima dos dois |
| `/pocket` | **Na POC não muda nada.** A página continua existindo como está, pra comparar lado a lado |

### Se aprovado (depois da POC)

- Tirar "Pocket" do `MainHeader.tsx` (menu fica Home, Eventos, Atacantes,
  FAQ).
- `/pocket` passa a redirecionar pra `/?modo=rapida`, pra não quebrar links
  salvos. A Home lê `?modo=` do mesmo jeito que já lê `?p=` (deep link do
  Plano).
- Apagar a lógica de busca duplicada de `app/pocket/page.tsx`.
- Decidir se a busca "ao vivo" com vários resultados volta (ver acima).

### Se reprovado

Descartar a branch da POC. A Home e a `/pocket` continuam como estão.

---

## Impacto

🟢 Baixo pra POC: só `app/page.tsx`, feita numa branch separada
(`poc/pocket-na-home`), sem push na `develop` (push na `develop` publica
direto em produção). Não toca `data/`, `models/` nem os cards.

🟡 Médio se aprovado: some uma rota do menu e muda um hábito de uso.

---

## Pendências

- Posição do seletor no celular: na linha dos recentes ele aperta os chips.
  Já testadas e descartadas: chips com rolagem pro lado e seletor dentro do
  card. Segue em aberto achar algo melhor.
- Avaliar com o uso se faz falta ver vários resultados de uma vez no modo
  Rápida (a busca "ao vivo" da antiga /pocket).
