# Sprint 1 — foundation and identity

**Goal:** A restaurant operator can sign in by phone, create a restaurant profile, and enter a mobile-first application shell.

## Included

- Next.js, TypeScript, Tailwind CSS, and shadcn-compatible component setup
- Installable PWA manifest and offline fallback
- Supabase browser/server clients and session refresh proxy
- Phone OTP sign-in and verification
- Restaurant profile onboarding
- Owner, admin, and staff organization roles
- Database migration, row-level security, and local seed data
- Mobile bottom navigation and desktop sidebar
- Marketplace/SOS/order shell using demo data
- CI, staging configuration, and environment template

## Exit gate

A configured deployment passes `npm run check`; a new user can authenticate by phone, create one restaurant organization, and reach `/marketplace`.

## Explicitly deferred

Listings, checkout, payouts, Uber quotes/deliveries, live tracking, notifications, disputes, and admin operations belong to later sprints.
