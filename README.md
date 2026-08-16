# 🌸 PokéStudio da Lori

> A companheira para decisões inteligentes no Pokémon GO.

## Objetivo

Centralizar todas as informações importantes sobre um Pokémon para responder rapidamente perguntas como:

- Vale investir?
- Vale evoluir?
- Vale maximizar?
- Qual o PC do hundo?
- Qual o melhor moveset?
- Vale Elite TM?

---

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Vercel

---

## Configuração

Só uma variável é definida à mão: **`PLANO_SENHA`**, a senha para marcar os passos
em `/plano`. Sem ela a página abre em modo leitura.

O resto vem do Blob store, onde o progresso do checklist é guardado (o mesmo em
todos os aparelhos).

### Criar o Blob store

1. Painel da Vercel → projeto → **Storage** → **Create Database** → **Blob**
2. **Continue** → acesso **Private** (o código usa blob privado; público não serve)
3. Dar um nome e criar
4. Marcar os ambientes: **Production**, **Preview** e — se for rodar local —
   **Development**

A Vercel injeta sozinha o `BLOB_STORE_ID` (e emite o `VERCEL_OIDC_TOKEN` em
runtime — é assim que a autenticação funciona; não há token estático). Depois é só
definir `PLANO_SENHA` em **Settings → Environment Variables** e refazer o deploy.

> `PLANO_SENHA` e `BLOB_STORE_ID` precisam existir **nos mesmos ambientes**. Se um
> deles faltar em algum, ali o `/plano` fica sem sincronizar.

### Rodar local

```bash
vercel env pull
```

Se as variáveis do Blob não aparecerem no `.env.local`, a conexão do store não
inclui **Development**: no store, aba **Projects** → menu `⋯` do projeto →
**Update Project Connection** → marcar Development. O mesmo vale para a
`PLANO_SENHA`, que precisa estar marcada em Development.

Sem o Blob o app funciona normalmente — só o `/plano` fica sem sincronizar, usando
o estado gravado no `data/plano.json`.

---

## Status

🚧 Em desenvolvimento