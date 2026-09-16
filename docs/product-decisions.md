# Product Decisions

## 2026-07-11

### Decisão

A aplicação não será uma Pokédex.

### Motivo

Existem diversas Pokédex excelentes.

O foco do PokéStudio é apoiar decisões.

---

### Decisão

Não utilizar login na V1.

### Motivo

A aplicação será de uso pessoal.

---

### Decisão

Utilizar banco JSON inicialmente.

### Motivo

Simplifica o desenvolvimento e reduz custos.

---

### Decisão

A Home terá apenas um campo de busca.

### Motivo

A pesquisa é a principal funcionalidade do produto.

## 2026-09-16

### Decisão

Adicionar login por senha, protegendo `/admin` e as notas pessoais
("Nota da Lori") em `/eventos`. Reverte a decisão de 2026-07-11 de não
utilizar login na V1.

### Motivo

O link do PokéStudio passou a ser compartilhado com amigos, então o uso
deixou de ser só pessoal. Conteúdo de curadoria interna precisa ficar fora
do alcance de quem não é a Lorena.