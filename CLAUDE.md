# Web Project Scaffold — AI Agent Instructions

> **This is a TEMPLATE repository.** When using this scaffold for a new venture, replace "Web Project Scaffold" with your venture name and customize sections below to match your specific domain and requirements.

## Tech Stack

React 19 + Vite 7 + shadcn/ui + TailwindCSS 4 + React Router + TanStack Query
NestJS 11 + Prisma 6 + PostgreSQL
Single Docker image (NestJS serves React SPA)

## Project Structure

```
├── backend/              # NestJS 11 API
│   ├── prisma/           # Prisma schema and migrations
│   ├── src/
│   │   ├── health/       # Health check module
│   │   └── main.ts       # Entry point (serves /app/public as SPA)
│   └── test/             # E2E tests
├── frontend/             # React 19 + Vite SPA
│   ├── src/
│   │   ├── components/   # Shared components
│   │   ├── hooks/        # Custom hooks
│   │   ├── lib/          # Utilities (API client, etc.)
│   │   └── pages/        # Page components
│   └── vite.config.ts    # Vite config (proxies /api to backend)
├── Dockerfile            # Multi-stage build (frontend → backend → runtime)
├── docker-compose.yml    # Local dev with PostgreSQL
└── .github/workflows/    # CI pipeline
```

## Coding Standards

- TypeScript strict mode, no `any` types
- One NestJS module per entity: module + controller + service + dto + spec
- Use `class-validator` for DTOs
- Frontend: pages in `src/pages/`, hooks in `src/hooks/`, shadcn/ui components
- Tests: Jest (backend), lint + build verification
- Git: conventional commits, feature branches from main

## Docker Gotchas

1. `depends_on` alone is NOT enough — always use healthcheck + `condition: service_healthy`
2. Prisma needs migration at runtime — use `prisma db push` in CMD
3. Frontend builds to `../public`, backend serves from `/app/public`

## Build Verification

After all code changes, run:

- Frontend: `cd frontend && npm run lint && npm run build`
- Backend: `cd backend && npm run lint && npm test && npm run build`

Max 5 retries if any step fails.

## Local Development

```bash
# Start database
docker compose up db -d

# Backend (terminal 1)
cd backend
npm install
npx prisma db push
npm run start:dev

# Frontend (terminal 2)
cd frontend
npm install
npm run dev
```

Frontend dev server proxies `/api` requests to the backend at `localhost:3000`.

## Template Customization

When forking this scaffold for a new venture:

1. Update this file — replace template references with your venture details
2. Edit `backend/prisma/schema.prisma` — add your domain models
3. Add NestJS modules for each entity in `backend/src/`
4. Add pages and routes in `frontend/src/`
5. Update `.env.example` with any new environment variables
6. Customize the CI workflow if you need additional checks
