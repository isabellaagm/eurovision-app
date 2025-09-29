# EuroVision – Plataforma de Inovação

Painel executivo que centraliza KPIs de inovação, pipeline de projetos, trilhas de engajamento e serviços de apoio para squads corporativos da Eurofarma.

[🔗 Acesse a demo em produção](https://eurovision-app-rust.vercel.app/)

## Tecnologias principais

- Next.js 14 (App Router) e React 18 para a camada web e SSR.
- TypeScript, ESLint e Tailwind CSS para tipagem, linting e estilização responsiva.
- Supabase (auth, helpers SSR/CSR) como backend-as-a-service e persistência primária.
- SWR, Recharts e XLSX para data fetching, visualização de gráficos e exportação de relatórios.

## Pré-requisitos

- Node.js 20+ para compatibilidade com o runtime esperado pelo Next.js.
- pnpm habilitado via `corepack` para gerenciar dependências.

## Como começar

1. Instale as dependências: `pnpm install`.
2. Rode o servidor de desenvolvimento em `http://localhost:3000`: `pnpm dev`.
3. Gere uma build de produção quando necessário: `pnpm build` (e execute com `pnpm start`).
4. Verifique o lint antes de enviar mudanças: `pnpm lint`.

## Variáveis de ambiente

Configure um arquivo `.env.local` com as credenciais abaixo para habilitar Supabase e o assistente de IA.

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Sim | Endpoint do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim | Chave anônima usada pelo cliente (SSR/CSR). |
| `OPENROUTER_API_KEY` | Opcional | Necessária apenas para ativar o chat de IA. |

Sem `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`, os endpoints de projetos retornam erro e caem no modo mock; sem `OPENROUTER_API_KEY`, o chat permanece desabilitado.

## Principais recursos

### Home de visão geral
Landing page apresenta chamadas para dashboards, portfólio e trilhas de engajamento com CTA de login para usuários autorizados.

### Dashboard executivo
Consolida métricas estratégicas, gráficos por status/gerência, cards de destaque e exportação rápida do portfólio em Excel.

### Portfólio de projetos
Listagem filtrável por palavra-chave, status e gerência, com feedback de carregamento/erro e cards detalhados para cada projeto.

Os dados vêm do Supabase quando configurado, com fallback automático para mocks e validação de sessão do usuário.

### Gamificação e trilhas
Página server-side que busca trilhas de inovação, progresso individual e badges diretamente do Supabase para engajar squads.

### Solicitações de solução
Formulário client-side que envia novos desafios para o time de inovação e mantém estado otimista usando um endpoint em memória (prototipação).

### Assistente virtual com IA
Widget flutuante que habilita conversa contextual sobre o portfólio quando a chave OpenRouter está configurada; quando ausente, permanece em modo somente leitura.

## Camada de dados e APIs

- `getDashboardMetrics`, `getAllProjects` e `getProjectsSummary` reutilizam `listProjects`, agregando dados em memória para KPIs e gráficos.
- `listProjects`/`fetchProjectById` aplicam autorização via Supabase e fallback para mocks quando a infraestrutura não está configurada.
- Mutations (`createProject`, `updateProject`, `removeProject`) exigem usuário autenticado e retornam mensagens claras em caso de indisponibilidade do Supabase.

### Endpoints relevantes

- `GET /api/projects` – lista projetos com metadados da origem; `POST /api/projects` cria um novo registro validando o payload.
- `GET /api/requests` e `POST /api/requests` – leitura e criação de solicitações em memória para prototipação rápida.
- `GET /api/export/excel` – gera relatório `.xlsx` com dados atuais do portfólio.
- `POST /api/ai/chat` – proxy seguro para OpenRouter com contexto mockado do portfólio.

## Autenticação e middleware

Tela de login usa Supabase Password Auth, exibindo feedback amigável caso as variáveis não estejam configuradas e redirecionando para `/projects` após sucesso.

O middleware renova sessões Supabase em todas as rotas (exceto estáticos) e compartilha cookies entre requisições SSR.

Helpers `getSupabaseServerClient` e `getSupabaseBrowserClient` garantem reuso seguro dos clientes em ambiente server/client.

## Estrutura do repositório

- `src/app`: páginas do App Router (dashboard, projetos, gamificação, requests, APIs).
- `src/components`: componentes reutilizáveis (dashboard, projetos, chat, layout).
- `src/lib`: camada de dados, clientes Supabase, mocks e tipagens compartilhadas.
- `documentacao`: artefatos em PDF com requisitos, arquitetura, cronograma e plano de testes.

## Documentação complementar

- Consulte a documentação complementar:
  - [Casos de Uso – EuroVision](documentacao/Casos%20de%20uso%20-%20EuroVision.pdf)
  - [Cronograma](documentacao/Cronograma.pdf)
  - [Diagrama de Arquitetura Planejada](documentacao/Diagrama%20de%20Arquitetura%20Planejada.pdf)
  - [Lista de Requisitos do Projeto](documentacao/Lista%20de%20Requisitos%20do%20Projeto.pdf)
  - [Plano de Testes](documentacao/Plano%20de%20Testes.pdf)
  - [Relação de Tecnologias](documentacao/Rela%C3%A7%C3%A3o%20de%20tecnologias.pdf)

## Scripts úteis

- `pnpm dev` – modo desenvolvimento.
- `pnpm build` / `pnpm start` – build e execução em produção.
- `pnpm lint` – checagem de qualidade.
