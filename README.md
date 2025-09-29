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
