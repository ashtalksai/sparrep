# SparrRep (Prepitch)

> AI sparring partner for B2B sales reps. Practice tomorrow's call today.

## What it does

Build a simulation of your specific upcoming prospect from your call notes, then practice the conversation. Get scored on discovery, objection handling, urgency, and next steps.

## Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **Auth**: NextAuth.js v5 (credentials + Google OAuth)
- **Database**: Prisma + PostgreSQL (shared instance)
- **Payments**: Stripe (test mode)
- **AI**: OpenAI GPT-4o-mini for buyer simulation + scoring
- **Animations**: Framer Motion

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page (10 sections) |
| `/about` | About + mission |
| `/pricing` | Pricing plans |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/login` | Sign in |
| `/signup` | Create account |
| `/dashboard` | Session history + CTA |
| `/session/new` | Persona builder (60-second setup) |
| `/session/[id]` | Live sparring session |
| `/scorecard/[id]` | Post-session scoring breakdown |
| `/deck` | Interactive pitch deck |
| `/docs` | Documentation hub |
| `/api/health` | Health check endpoint |

## Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma client
npx prisma generate

# Create DB (on shared Postgres)
ssh ash-server "sudo docker exec k80c0s08c84kgcs44kckcos0 psql -U postgres -c 'CREATE DATABASE sparrep;'"

# Push schema
npx prisma db push

# Run dev server
npm run dev
```

## Environment Variables

See `.env.example` for all required variables.

Key ones:
- `DATABASE_URL` — shared Postgres connection string
- `AUTH_SECRET` — generated with `openssl rand -base64 32`
- `OPENAI_API_KEY` — GPT-4o-mini for buyer simulation
- `STRIPE_SECRET_KEY` — test mode keys

## Deploy

See `~/clawd/areas/infrastructure/deployment-rules.md`. Deploy via Coolify to `sparrep.ashketing.com`.

```bash
# Push to GitHub
gh repo create ashtalksai/sparrep --public --source=. --push

# Then deploy via Coolify
# Set Dockerfile build pack (NOT Nixpacks)
# Set memory limit: 256MB
# Set subdomain: sparrep.ashketing.com
```

## Business Model

- **Free**: 3 sessions/month
- **Pro**: $49/user/month — unlimited sessions + full scoring
- **Team**: Custom — manager dashboard + team analytics
