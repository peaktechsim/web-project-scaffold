# Web Project Scaffold

A production-ready web application template: **React 19 + Vite + TailwindCSS 4** frontend with **NestJS 11 + Prisma 6 + PostgreSQL** backend, packaged as a single Docker image.

## Quick Start

```bash
# Clone the repo
git clone https://github.com/peaktechsim/web-project-scaffold.git
cd web-project-scaffold

# Copy environment variables
cp .env.example .env

# Start everything with Docker
docker compose up
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Development

### Prerequisites

- Node.js 22+
- Docker (for PostgreSQL)

### Setup

```bash
# Start the database
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

- Frontend dev server: [http://localhost:5173](http://localhost:5173) (proxies `/api` → backend)
- Backend API: [http://localhost:3000](http://localhost:3000)
- Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health)

### Build Verification

```bash
# Frontend
cd frontend && npm run lint && npm run build

# Backend
cd backend && npm run lint && npm test && npm run build
```

## Project Structure

```
├── backend/                # NestJS 11 API
│   ├── prisma/             # Prisma schema
│   ├── src/                # Source code
│   │   ├── health/         # Health check module
│   │   └── main.ts         # Entry point
│   └── test/               # E2E tests
├── frontend/               # React 19 + Vite SPA
│   ├── src/
│   │   ├── components/     # Shared components
│   │   ├── hooks/          # Custom hooks
│   │   ├── lib/            # Utilities
│   │   └── pages/          # Page components
│   └── vite.config.ts      # Vite config
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml      # Local dev environment
├── CLAUDE.md               # AI agent instructions
└── .github/workflows/      # CI pipeline
```

## Docker

The multi-stage Dockerfile builds both frontend and backend, producing a single lightweight image:

1. **Frontend build** — compiles React app with Vite
2. **Backend build** — compiles NestJS and generates Prisma client
3. **Runtime** — production Node.js server serving both API and SPA

```bash
# Build and run with Docker Compose
docker compose up --build

# Or build standalone
docker build -t web-project-scaffold .
```

## Using as a Template

1. Click **"Use this template"** on GitHub (or fork the repo)
2. Update `CLAUDE.md` with your venture name and specifics
3. Edit `backend/prisma/schema.prisma` with your data models
4. Add NestJS modules for each entity
5. Build out frontend pages and routes
6. Update `.env.example` with any new environment variables

## Tech Stack

| Layer    | Technology                                        |
| -------- | ------------------------------------------------- |
| Frontend | React 19, Vite 7, TailwindCSS 4, TanStack Query  |
| Backend  | NestJS 11, Prisma 6, PostgreSQL 17                |
| Infra    | Docker (multi-stage), GitHub Actions CI           |

## License

MIT
