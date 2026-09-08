# Repository instructions

This repository is the Restaurant Efficiency Market MVP: a mobile-first B2B marketplace for Los Angeles restaurants.

## Product boundaries

- The company brokers transactions and does not hold inventory.
- Surplus inventory can sell over several days; SOS requests are same-day and priority-priced.
- One seller per order. Do not add multi-seller carts.
- Delivery is outsourced to Uber Direct. Do not add manual dispatch or an internal driver system.
- The private beta is one dense 3–5 mile Los Angeles cluster.
- Native apps, POS integrations, chat, ratings, and multi-city logic are out of MVP scope.

## Engineering rules

- Keep all payments, Uber credentials, and privileged Supabase access server-side.
- Authenticate webhooks, store provider event IDs, and make handlers idempotent.
- Preserve organization-level row-level security for every restaurant-owned record.
- Add tests for business rules and failure paths, not only happy-path UI.
- Run `npm run check` before merging.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
