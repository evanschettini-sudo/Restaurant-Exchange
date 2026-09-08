# Restaurant Efficiency Market

A mobile-first B2B marketplace that lets Los Angeles restaurants monetize surplus inventory and source urgent same-day inventory without the platform warehousing goods or operating delivery.

This repository contains the Sprint 1 foundation: phone authentication, restaurant organizations and roles, onboarding, responsive navigation, PWA support, Supabase migrations, demo data, and deployment/CI configuration.

## Start locally

Requirements: Node.js 22+, Docker, and the Supabase CLI dependency installed by `npm install`.

```bash
npm install
cp .env.example .env.local
npm run db:start
npm run db:reset
npm run dev
```

After Supabase starts, copy the local project URL and anon key printed by `supabase status` into `.env.local`. Open [http://localhost:3000](http://localhost:3000).

Hosted phone authentication requires an SMS provider configured in Supabase. Local OTP delivery appears in the local Auth logs; production credentials never belong in this repository.

## Validate

```bash
npm run check
```

This runs linting, TypeScript, unit tests, and the production build.

## Deploy staging

1. Create a hosted Supabase project and apply `supabase/migrations`.
2. Enable phone authentication and configure its SMS provider.
3. Import the repository into Vercel.
4. Set `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_SUPABASE_URL`, and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the staging environment.
5. Deploy and complete the Sprint 1 exit gate in `docs/sprint-1.md`.

Stripe and Uber keys are placeholders for later sprints and should remain unset for Sprint 1.

## Repository map

- `src/app` — routes, layouts, server actions, and PWA metadata
- `src/components` — application and shadcn-compatible UI components
- `src/lib` — auth, organization access, validation, fixtures, and Supabase clients
- `src/types` — generated-style database types
- `supabase` — local configuration, migrations, and seed data
- `docs` — product and architecture decisions
