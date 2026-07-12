# Arquitetura

## Front-end

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

---

## Deploy

- Vercel

---

## Banco

V1

JSON local.

V2

Supabase.

---

## Estrutura

src/

app/

components/

features/

hooks/

services/

types/

utils/

lib/

data/

---

## Organização

A aplicação seguirá Feature Based Architecture.

Cada funcionalidade possuirá seus próprios componentes, serviços e tipos.

---

## Fonte de dados

Inicialmente:

Banco próprio em JSON.

A PokéAPI poderá ser utilizada apenas como fonte de consulta durante a construção da base de dados.

---

## Estado

React Server Components

Server Actions

useState

Somente quando necessário.

---

## Objetivo

Manter uma aplicação simples, performática e fácil de evoluir.