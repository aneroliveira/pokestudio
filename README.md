# 🌸 PokéStudio da Lori

<!-- Nota interna: projeto renomeado para "PokéPocket da Lori" (domínio pogopocket.vercel.app). Este documento ainda não foi atualizado com o novo nome. -->

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

Nenhuma variável precisa ser digitada à mão. Tudo vem do Blob store, onde o
progresso do checklist do `/plano` é guardado — o mesmo em todos os aparelhos.

### Criar o Blob store

1. Painel da Vercel → projeto → **Storage** → **Create Database** → **Blob**
2. **Continue** → acesso **Private** (o código usa blob privado; público não serve)
3. Dar um nome e criar
4. Marcar os ambientes: **Production**, **Preview** e — se for rodar local —
   **Development**

A Vercel injeta sozinha o `BLOB_STORE_ID` e emite o `VERCEL_OIDC_TOKEN` em
runtime. É assim que a autenticação funciona; não há token estático.

> A escrita do progresso é **aberta** — não há senha. Decisão de 31/08/2026: o
> site é pessoal, e o pior caso é alguém alternar um checkbox. A curadoria em si
> vive versionada no `data/plano.json`, fora do alcance da rota.

### Rodar local

```bash
vercel env pull
```

Se as variáveis do Blob não aparecerem no `.env.local`, a conexão do store não
inclui **Development**: no store, aba **Projects** → menu `⋯` do projeto →
**Update Project Connection** → marcar Development.

Sem o Blob o app funciona normalmente — só o `/plano` fica sem sincronizar, usando
o estado gravado no `data/plano.json`.

### Publicar

A branch de produção é a `develop` (**Settings → Environments → Production →
Branch Tracking**). Push nela publica direto; não é preciso promover nada.

---

## Status

🚧 Em desenvolvimento