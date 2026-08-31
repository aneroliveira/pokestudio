# Arquitetura

<!-- Nota interna: projeto renomeado para "PokéPocket da Lori" (domínio pogopocket.vercel.app). Este documento ainda não foi atualizado com o novo nome. -->

Este documento registra as principais decisões arquiteturais do PokéStudio da Lori.

## Objetivo

O PokéStudio da Lori foi concebido como uma aplicação web voltada para auxiliar jogadores de Pokémon GO na tomada de decisões.

O foco do projeto não é substituir uma Pokédex tradicional, mas fornecer informações estratégicas de forma simples, rápida e organizada.

Este documento registra as decisões arquiteturais do projeto através de RFCs (Request for Change), permitindo compreender não apenas o que foi implementado, mas também os motivos que levaram cada decisão.

Sempre que uma alteração estrutural for proposta, ela deverá ser registrada neste documento antes de sua implementação.

---

## Princípios Arquiteturais

As decisões do PokéStudio seguem alguns princípios fundamentais:

- Simplicidade antes da complexidade.
- Componentes pequenos e reutilizáveis.
- Separação clara de responsabilidades.
- Arquitetura orientada ao domínio do negócio.
- Refatorações somente após aprovação de uma RFC.
- Toda mudança estrutural deve possuir uma justificativa.
- A documentação evolui junto com o código.

---

# RFC-001

## Título

Organização dos Services por domínio.

## Status

✅ Aprovada

## Data

11/07/2026

## Motivação

Evitar que um único arquivo de services cresça indefinidamente.

## Alternativas consideradas

- Um único arquivo (`pokemon.service.ts`)
- Organização por domínio

## Decisão

Cada domínio possuirá sua própria pasta de services.

Exemplo:

services/
└── pokemon/
    ├── listarPokemons.ts
    └── index.ts

---

# RFC-002

## Título

Criar uma SearchBar própria do PokéStudio.

## Status

✅ Aprovada

## Data

11/07/2026

## Motivação

A busca será o principal ponto de entrada da aplicação.

## Decisão

Criar um componente próprio (`SearchBar`) utilizando o `Input` do shadcn/ui.

---

# RFC-003

## Título

Home centrada na busca.

## Status

✅ Aprovada

## Data

11/07/2026

## Motivação

O usuário deve entender imediatamente qual é o propósito da aplicação.

## Decisão

A Home exibirá inicialmente apenas:

- Logo
- Slogan
- Campo de pesquisa

O resultado aparecerá somente após uma pesquisa.

---

# RFC-004

## Título

Busca em tempo real.

## Status

✅ Aprovada

## Data

11/07/2026

## Motivação

Oferecer uma experiência moderna e fluida.

## Alternativas

- Botão "Pesquisar"
- Busca instantânea

## Decisão

Os resultados serão atualizados conforme o usuário digita.

---

# RFC-005

## Título

Padrão de Git e Commits.

## Status

✅ Aprovada

## Data

11/07/2026

## Decisão

O projeto utilizará:

- Conventional Commits
- GitFlow
- Releases versionadas

---
RFC-006
Título

Utilizar um banco de dados próprio como fonte primária de informações.

Status

🟢 Aprovada

Data

11/07/2026

Motivação

O PokéStudio foi concebido como um assistente de decisão para Pokémon GO, e não como uma Pokédex tradicional.

As informações necessárias para apoiar decisões estratégicas (como Tier, prioridade de investimento, CP 100%, recomendações de uso e observações pessoais) não estão disponíveis integralmente em APIs públicas.

Alternativas consideradas
Consumir apenas PokéAPI.
Manter uma base própria.
Decisão

A aplicação utilizará uma base de dados própria (inicialmente em JSON), podendo complementar informações com APIs externas quando necessário.

Impacto

🟢 Baixo

---

## Decisões Congeladas

As decisões abaixo somente poderão ser alteradas mediante aprovação de uma nova RFC.

- Organização das pastas.
- Estratégia de documentação.
- Fluxo de Git.
- Estrutura dos Services.
- Estrutura dos Models.

---

Última atualização

11/07/2026

Versão da arquitetura

v0.1.0 Foundation

---

## Histórico

| RFC | Status | Data |
|-----|--------|------|
| RFC-001 | ✅ | 11/07/2026 |
| RFC-002 | ✅ | 11/07/2026 |
| RFC-003 | ✅ | 11/07/2026 |
| RFC-004 | ✅ | 11/07/2026 |
| RFC-005 | ✅ | 11/07/2026 |
| RFC-006 | ✅ | 11/07/2026 |