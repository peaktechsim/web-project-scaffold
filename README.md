# Web Project Scaffold

A production-ready, full-stack web application template built for rapid MVP development. Ships as a **single Docker image** with a React frontend served by a NestJS backend.

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React + Vite + TailwindCSS + React Router + TanStack Query | 19 / 6 / 4 / 7 / 5 |
| Backend | NestJS + Prisma + PostgreSQL | 11 / 6 / 17 |
| Runtime | Node.js on Alpine Linux | 22 |
| CI/CD | GitHub Actions | lint + test + build |
| Output | Single multi-stage Docker image | One container, one port |

---

## Quick Start

```bash
git clone https://github.com/peaktechsim/web-project-scaffold.git
cd web-project-scaffold
cp .env.example .env
docker compose up
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the dashboard with a live health check indicator.

---

## What's Included

### Backend (`backend/`)

A NestJS 11 application with a modular architecture designed for extension:

| Component | Path | Purpose |
|-----------|------|---------|
| **Bootstrap** | `src/main.ts` | App entry point. Configures CORS, global `ValidationPipe` (whitelist + transform), and `HttpExceptionFilter`. Listens on `PORT` env var (default 3000). |
| **App Module** | `src/app.module.ts` | Root module. Imports `ServeStaticModule` (serves the React SPA from `../public`), `HealthModule`, and provides `PrismaService` globally. |
| **PrismaService** | `src/config/prisma.service.ts` | Injectable database service extending `PrismaClient`. Connects on module init, disconnects on destroy. Shared across all modules. |
| **Health Module** | `src/health/` | `GET /api/health` returns `{ status: "ok", timestamp: "..." }`. Used by Docker healthchecks and the frontend dashboard. |
| **Exception Filter** | `src/filters/http-exception.filter.ts` | Global filter that normalizes all HTTP errors to `{ statusCode, message, error, timestamp, path }`. |
| **Prisma Schema** | `prisma/schema.prisma` | PostgreSQL datasource with an example `User` model (uuid id, email, name, timestamps). Mapped to `users` table. |
| **Tests** | `src/app.controller.spec.ts`, `test/` | Unit test for AppController + E2E test structure with Jest + Supertest. |

**Key conventions:**
- All API routes live under `/api/` prefix
- One NestJS module per entity (controller + service + DTO + spec)
- DTOs use `class-validator` decorators
- TypeScript strict mode enabled

### Frontend (`frontend/`)

A React 19 single-page application with modern tooling:

| Component | Path | Purpose |
|-----------|------|---------|
| **Entry** | `src/main.tsx` | Wraps the app in `StrictMode` + `BrowserRouter` + `QueryClientProvider` + `ErrorBoundary`. TanStack Query configured with 60s stale time. |
| **Router** | `src/App.tsx` | React Router with a single route (`/` → `DashboardPage`). Add routes here as you build. |
| **Error Boundary** | `src/components/ErrorBoundary.tsx` | Class component that catches render errors and shows a user-friendly fallback with a "Try again" button. |
| **Dashboard** | `src/pages/DashboardPage.tsx` | Placeholder page showing app name, live API health status, and starter cards. Replace with your app's real content. |
| **API Client** | `src/lib/api.ts` | Typed fetch wrapper with `get<T>`, `post<T>`, `patch<T>`, `del` helpers. Custom `ApiError` class. Includes `fetchHealth()` example. |
| **Health Hook** | `src/hooks/useHealth.ts` | TanStack Query hook demonstrating the data-fetching pattern. Polls `/api/health` every 30s. |

**Key conventions:**
- Pages in `src/pages/`, hooks in `src/hooks/`, shared components in `src/components/`
- TailwindCSS utility classes only (no custom CSS, no inline styles)
- Vite dev server proxies `/api` requests to the backend at `localhost:3000`
- Build output goes to `../public` (served by NestJS in production)

### Docker

The multi-stage Dockerfile produces a single lightweight image:

```
Stage 1: frontend-build   — npm ci + vite build → outputs to /app/public
Stage 2: backend-build     — npm ci + prisma generate + nest build → outputs to /app/backend/dist
Stage 3: runtime           — copies dist + prisma client + public → runs the app
```

**Important:** Vite's `outDir: '../public'` means the frontend build output is at `/app/public`, not `/app/frontend/dist`. The Dockerfile uses `COPY --from=frontend-build /app/public ./public`.

The `CMD` runs `prisma db push --skip-generate` before starting Node — this auto-migrates the database schema on every container start.

### docker-compose.yml

Local development stack:

```yaml
db:    postgres:17-alpine   # Port 5432, healthcheck with pg_isready
app:   builds Dockerfile    # Port 3000, waits for db to be healthy
```

The `depends_on` uses `condition: service_healthy` (not bare `depends_on`) to ensure Postgres is actually ready for queries before the app starts.

### CI/CD (`.github/workflows/ci.yml`)

GitHub Actions pipeline triggered on pushes to `main`/`dev` and all PRs:

| Job | Steps |
|-----|-------|
| **Frontend** | `npm ci` → `npm run lint` → `npm run build` |
| **Backend** | `npm ci` → `prisma generate` → `npm run lint` → `npm test` → `npm run build` |

### CLAUDE.md

Instructions for AI coding agents working on the repo. Contains the tech stack, coding standards, project structure, and Docker gotchas. When using this template for a new venture, update this file with your project's specific context.

---

## Development

### Prerequisites

- Node.js 22+
- Docker (for PostgreSQL, or use a remote Postgres)

### Local Development (two terminals)

```bash
# Start the database
docker compose up db -d

# Terminal 1: Backend
cd backend
npm install
npx prisma db push
npm run start:dev        # http://localhost:3000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev              # http://localhost:5173 (proxies /api → :3000)
```

### Build Verification

```bash
# Frontend
cd frontend && npm run lint && npm run build

# Backend
cd backend && npm run lint && npm test && npm run build
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql://app:app@localhost:5432/app_dev` | Postgres connection string |
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Environment (`development` or `production`) |

Copy `.env.example` to `.env` and adjust as needed.

---

## Using as a Template

### 1. Create your repo

Click **"Use this template"** on GitHub, or:

```bash
git clone https://github.com/peaktechsim/web-project-scaffold.git my-venture
cd my-venture
rm -rf .git && git init
```

### 2. Define your data model

Edit `backend/prisma/schema.prisma`. Replace the example `User` model with your entities:

```prisma
model Product {
  id        String   @id @default(uuid())
  name      String
  price     Int
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("products")
}
```

Then run `npx prisma db push` to apply.

### 3. Add backend modules

For each entity, create a NestJS module following the pattern:

```
backend/src/modules/product/
├── product.module.ts        # Module declaration
├── product.controller.ts    # REST endpoints (GET, POST, PATCH, DELETE)
├── product.service.ts       # Business logic with PrismaService
├── product.dto.ts           # class-validator DTOs
└── product.spec.ts          # Unit tests
```

Import the new module in `app.module.ts`.

### 4. Build frontend features

Add pages, hooks, and API client functions:

```
frontend/src/
├── pages/ProductsPage.tsx       # New page component
├── hooks/useProducts.ts         # TanStack Query hooks
└── lib/api.ts                   # Add fetchProducts(), createProduct(), etc.
```

Add routes in `App.tsx`.

### 5. Update project files

- `CLAUDE.md` — Replace "Web Project Scaffold" with your venture name, add your specific coding standards
- `README.md` — Describe your app
- `.env.example` — Add any new environment variables
- `package.json` (both) — Update name and description

---

## Project Structure

```
web-project-scaffold/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma           # Database schema (User model example)
│   ├── src/
│   │   ├── main.ts                 # App bootstrap + global pipes/filters
│   │   ├── app.module.ts           # Root module (SPA serving, health, Prisma)
│   │   ├── app.controller.ts       # Root API info endpoint
│   │   ├── app.controller.spec.ts  # Unit test
│   │   ├── config/
│   │   │   └── prisma.service.ts   # Database connection service
│   │   ├── health/
│   │   │   ├── health.module.ts    # Health check module
│   │   │   └── health.controller.ts# GET /api/health
│   │   └── filters/
│   │       └── http-exception.filter.ts  # Global error formatting
│   ├── test/
│   │   ├── app.e2e-spec.ts         # E2E test structure
│   │   └── jest-e2e.json           # E2E Jest config
│   ├── package.json
│   ├── tsconfig.json               # Strict TypeScript + decorators
│   └── nest-cli.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx                # React entry (Router + Query + ErrorBoundary)
│   │   ├── App.tsx                 # Route definitions
│   │   ├── index.css               # TailwindCSS imports + theme
│   │   ├── components/
│   │   │   └── ErrorBoundary.tsx   # Render error catcher
│   │   ├── pages/
│   │   │   └── DashboardPage.tsx   # Placeholder dashboard
│   │   ├── hooks/
│   │   │   └── useHealth.ts        # Health check hook (TanStack Query)
│   │   └── lib/
│   │       └── api.ts              # Typed API client (get/post/patch/del)
│   ├── vite.config.ts              # Build to ../public, proxy /api
│   ├── package.json
│   └── tsconfig.json
├── .github/
│   └── workflows/
│       └── ci.yml                  # Lint + test + build pipeline
├── Dockerfile                      # 3-stage build → single image
├── docker-compose.yml              # Local dev (Postgres + app)
├── CLAUDE.md                       # AI agent instructions
├── .env.example                    # Environment variable template
└── .gitignore
```

---

## License

MIT
