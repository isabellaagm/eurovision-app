1. **Node.js 20+** – utilize o mesmo runtime usado pelo Next.js 15.
2. **pnpm** – o projeto usa pnpm para gerenciar dependências (`corepack enable pnpm`).

## Configuração de variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as variáveis abaixo:

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Sim (para listar/prover projetos reais) | URL do projeto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Sim (para listar/prover projetos reais) | Chave anônima utilizada pelo cliente/SSR do Supabase. |
| `OPENROUTER_API_KEY` | Opcional | Necessária apenas para habilitar o widget de chat com IA (`/api/ai/chat`). Sem essa chave o widget permanece desativado no frontend. |

> Caso `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` não estejam configuradas, os endpoints de projetos (`/api/projects`) retornam erro 500 informando que o Supabase não está habilitado.

## Instalação e scripts úteis

```bash
pnpm install          # instala dependências
pnpm dev              # inicia o servidor de desenvolvimento em http://localhost:3000
pnpm lint             # executa as regras de lint (recomendado antes de enviar alterações)
```

## Fontes de dados

- O arquivo [`supabase/schema.sql`](supabase/schema.sql) consolida o modelo operacional e analítico sugerido (usuários, portfólio, gamificação e fatos dimensionais) e pode ser aplicado com `supabase db push`.
- As rotas de projetos (`/api/projects` e `/api/projects/[id]`) agora fazem fallback automático para os mocks sempre que o Supabase não estiver configurado ou o usuário não possuir sessão válida, permitindo navegação local sem infraestrutura.

## Learn More
### Projetos
- A listagem (`/projects`) e a página de detalhes (`/projects/[id]`) consomem os mesmos endpoints da API (`/api/projects` e `/api/projects/[id]`), garantindo consistência com o Supabase e compartilhando autenticação por cookies.
- Quando os dados vêm do Supabase, campos como `created_at`, `updated_at`, `status` e participantes são exibidos automaticamente.

### Dashboard
- Continua utilizando os mocks presentes em `src/lib/mockData.ts` para métricas e gráficos.

### Gamificação
- Os mocks e tipagens (`UserGamificationProgress`, `InnovationTrail`, `TrailStage`) foram alinhados com o formato snake_case usado pelo Supabase, evitando divergências entre componentes e dados fictícios.

### Solicitações de solução (`/requests`)
- O endpoint ainda mantém uma implementação em memória para fins de protótipo. Para persistência real recomenda-se:
  1. Criar uma tabela (ex.: `innovation_solution_requests`) no Supabase com os campos `id`, `title`, `description`, `gerencia`, `created_at` e `created_by`.
  2. Ajustar o handler `/api/requests` para gravar/consultar via Supabase usando a política de RLS apropriada.
  3. Opcionalmente, exibir o histórico de solicitações no frontend com feedback otimista.

## Deploy on Vercel
## Observações sobre o widget de IA

O componente `ChatWidget` agora verifica se `OPENROUTER_API_KEY` está configurada no servidor. Quando ausente, o botão permanece visível mas o formulário fica desativado e exibe uma mensagem guiando a configuração necessária, evitando erros no cliente.