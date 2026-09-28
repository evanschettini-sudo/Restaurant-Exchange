# Module 1: hosted setup

Verified September 21, 2026 against Restaurant Efficiency Market (REX), project
`tgnawthfrszojkvwizss` in `us-east-1`.

- Identity migration applied unchanged to the previously empty hosted database.
- `profiles`, `organizations`, and `organization_members` have RLS enabled.
- Follow-up migration removes direct anonymous grants inherited from hosted default privileges.
- Hosted SQL smoke test passed: onboarding, owner membership, profile isolation,
  cross-organization read/write denial, duplicate onboarding rejection, and function grants.
- Test fixtures were rolled back. No persistent demo users have been loaded.
- `npm run check` passed: lint, TypeScript, 8 unit tests, production build.

The original identity migration filename now matches the version assigned by
Supabase when applied through the integration. Its SQL is unchanged. This keeps
future CLI pushes from attempting to create the same tables again. If a separate
database already recorded the old `202609010001` version, reconcile its migration
history before pushing; do not rerun the identity SQL against existing tables.

Three security-advisor notices remain for authenticated execution of the onboarding
and organization access helpers. These grants are intentional: the functions use
`auth.uid()`, fixed search paths, and organization membership checks. Anonymous
execution notices have been resolved. See
[Supabase's advisor explanation](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable).

## Hosting verification completed September 21, 2026

- Imported the existing GitHub repository into Vercel and configured the three
  public environment variables using the Supabase publishable key.
- Deployed main commit `05e4d520e499b62abc80606cc5fff6a7060bc404` successfully
  to https://restaurant-exchange.vercel.app (Vercel's Production target, used
  for pre-launch testing; not a separate isolated staging environment).
- Fixed the unsupported `lax1` function region to `iad1` on main.
- Verified the root redirects to sign-in, sign-in returns HTTP 200, and the
  observed requests have no application errors. Supabase's public API responded.
- Phone authentication was disabled at that verification; end-to-end login
  was not tested. Hosting success does not establish a functional marketplace.

## Remaining before Module 1 is complete

Create staging demo identities through supported Auth flows, then onboard
fictional restaurants. Do not deploy the local-only `supabase/seed.sql`.

Phone OTP/SMS-provider setup and two actual browser sign-ins remain Module 2 work.
The SQL test proves database behavior; it does not prove live SMS or browser sessions.

## Repeat the database smoke test

Run `supabase/tests/identity_smoke.sql` as database owner using a SQL client that
stops on errors (`psql -v ON_ERROR_STOP=1 -f supabase/tests/identity_smoke.sql`).
All fixtures are inside a transaction ending in rollback.
