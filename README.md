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

Copie `.env.example` para `.env.local` e preencha:

| Variável | Para quê |
|---|---|
| `PLANO_SENHA` | Senha para marcar os passos em `/plano`. Sem ela, a página abre em modo leitura. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob, onde o progresso do checklist é guardado (compartilhado entre aparelhos). |

O token entra sozinho no projeto quando o Blob store é criado no painel da Vercel
(**Storage → Create → Blob**). Para rodar local, traga as variáveis com:

```bash
vercel env pull .env.local
```

Sem o token o app funciona normalmente — só o `/plano` fica sem sincronizar, usando
o estado gravado no `data/plano.json`.

---

## Status

🚧 Em desenvolvimento