# Restaurant Efficiency Market — Module Build Plan

**Version:** 1.0  
**Date:** September 1, 2026  
**Goal:** Move from the existing Sprint 1 scaffold to a reliable private beta through small, testable modules.

## How to use this plan

- Work on one module at a time.
- Check off a task only after it works in the environment named in the task.
- A module is complete only when its **done gate** passes.
- Run `npm run check` and make one commit at the end of every completed module.
- Do not polish secondary screens while a core done gate is failing.

Effort estimates are focused build time with AI assistance. They exclude waiting for provider approval, legal guidance, restaurant recruiting, and unfamiliar-tool learning time.

## Current honest status

- The local Sprint 1 scaffold exists on `main` and has a clean worktree.
- `npm run check` passes: lint, TypeScript, 8 unit tests, and the production build.
- Phone authentication, organization onboarding, row-level-security policies, PWA navigation, and demo screens are coded.
- No Git remote is configured.
- A hosted Supabase project, hosted phone OTP, Vercel deployment, and live organization-isolation test have not been verified.
- Marketplace, selling, orders, and SOS screens are currently shells or demo data—not functioning marketplace modules.

## Milestones

| Milestone | Modules | Usable result |
| --- | --- | --- |
| A. Foundation proven | 0–2 | A restaurant can use the hosted app on a phone |
| B. Surplus prototype | 3–8 | One restaurant can list inventory and another can find it |
| C. Paid pickup beta | 9–13 | Two restaurants can complete a real paid pickup order |
| D. Delivered order | 14–16 | Uber Direct delivery works without manual dispatch |
| E. SOS flow | 17–19 | A buyer can request an urgent item and accept an offer |
| F. Private-beta ready | 20–23 | The product is supportable, observable, and recoverable |

---

## Milestone A — Prove the existing foundation

### Module 0 — Repository and quality baseline

**Status:** Partially complete  
**Effort remaining:** 0.5–1 hour  
**Depends on:** Nothing

- [x] Create the Next.js/TypeScript repository.
- [x] Add lint, typecheck, test, and build scripts.
- [x] Confirm `npm run check` passes locally.
- [x] Commit the Sprint 1 scaffold to local `main`.
- [ ] Create the GitHub repository.
- [ ] Add the GitHub remote and push `main`.
- [ ] Confirm the repository contains no real credentials or `.env.local` file.

**Done gate:** `main` is backed up remotely, the worktree is clean, and `npm run check` passes from a fresh clone.

### Module 1 — Hosted runtime and database

**Status:** Not verified  
**Effort:** 1–3 hours  
**Depends on:** Module 0

- [ ] Create the hosted Supabase project.
- [ ] Apply all migrations to the hosted database.
- [ ] Confirm the identity migration completes without manual SQL edits.
- [ ] Create or load safe staging demo data.
- [ ] Import the repository into Vercel.
- [ ] Set the three Sprint 1 public environment variables in Vercel.
- [ ] Deploy staging from `main`.
- [ ] Confirm the app loads without server or browser-console errors.

**Done gate:** A public staging URL loads the application against the hosted Supabase database.

### Module 2 — Live identity, organization isolation, and PWA acceptance

**Status:** Code complete; runtime unverified  
**Effort:** 1–3 hours  
**Depends on:** Module 1

- [x] Implement phone OTP sign-in and verification screens.
- [x] Implement restaurant onboarding and owner membership creation.
- [x] Add organization-scoped row-level-security helpers and policies.
- [x] Add responsive mobile/desktop navigation and PWA metadata.
- [ ] Configure the Supabase SMS provider for staging.
- [ ] Sign in as a brand-new user on staging.
- [ ] Create a restaurant and reach `/marketplace`.
- [ ] Create a second test user and restaurant.
- [ ] Prove each user cannot read or change the other restaurant's private records.
- [ ] Install the PWA on a real phone and verify navigation and offline fallback.

**Done gate:** Two independent staging users can onboard on a phone, and cross-organization access is blocked.

---

## Milestone B — Build the surplus marketplace vertical slice

### Module 3 — Listing schema and access rules

**Status:** Not started  
**Effort:** 3–5 hours  
**Depends on:** Module 2

- [ ] Add enums for allowed listing categories, units, and lifecycle states.
- [ ] Add the `listings` table with seller, product, package, quantity, price, traceability, pickup-window, and expiration fields.
- [ ] Store money as integer cents, not floating-point dollars.
- [ ] Add database constraints for positive price/quantity and valid time windows.
- [ ] Add indexes for active status, expiration, category, seller, and location queries.
- [ ] Add RLS: authenticated restaurants can read active listings; members can manage only their restaurant's listings.
- [ ] Add tests for unauthorized writes, invalid values, and expired records.
- [ ] Regenerate database TypeScript types.

**Done gate:** Two test organizations can read active marketplace inventory, while only the seller organization can create or change its listings.

### Module 4 — Listing photos and source records

**Status:** Not started  
**Effort:** 2–4 hours  
**Depends on:** Module 3

- [ ] Create private storage buckets for source invoices/documents.
- [ ] Create the listing-image storage path and access policy.
- [ ] Add document metadata linked to organization and listing.
- [ ] Enforce file-type and file-size limits.
- [ ] Generate signed URLs for private source records on the server.
- [ ] Test that another restaurant cannot open a seller's private invoice.

**Done gate:** A seller can attach a product photo and protected source record without exposing the source record publicly.

### Module 5 — Seller listing workflow

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Modules 3–4

- [ ] Replace the `/sell` placeholder with a working mobile form.
- [ ] Limit categories to sealed shelf-stable goods, unopened cases, disposables, and approved selected produce.
- [ ] Capture product, brand, package size, available quantity, unit, price, lot/best-by data, pickup window, and expiration.
- [ ] Upload the product photo and source record.
- [ ] Validate on both client and server.
- [ ] Add draft, publish, edit, pause, expire, and sold-out actions.
- [ ] Prevent edits that would create impossible order or inventory states.
- [ ] Show clear field-level errors and preserve entered values after failure.

**Done gate:** A seller can create, publish, edit, and expire a real database-backed listing from a phone.

### Module 6 — Marketplace feed and listing detail

**Status:** Demo shell only  
**Effort:** 3–5 hours  
**Depends on:** Module 5

- [ ] Replace `demoListings` with server-fetched database records.
- [ ] Show only active, unexpired listings with available quantity.
- [ ] Add a listing-detail route with seller, product, quantity, price, pickup window, and traceability summary.
- [ ] Display product images with a safe fallback.
- [ ] Add loading, empty, error, and expired states.
- [ ] Prevent the UI from presenting a seller's own listing as purchasable.
- [ ] Verify phone layout with long product and restaurant names.

**Done gate:** A second restaurant can find and open the seller's published listing without staff help.

### Module 7 — Search, distance, and seller inventory dashboard

**Status:** Demo filtering only  
**Effort:** 4–7 hours  
**Depends on:** Module 6

- [ ] Geocode verified restaurant addresses and store coordinates.
- [ ] Add database-backed text search.
- [ ] Add category, price, quantity, and distance filters.
- [ ] Sort by relevance, distance, price, and expiration.
- [ ] Add pagination or cursor loading.
- [ ] Add a seller inventory view for draft, active, paused, sold-out, and expired listings.
- [ ] Show views and availability status without inventing vanity analytics.

**Done gate:** A buyer can narrow real listings by useful criteria, and a seller can manage all of its inventory from one screen.

### Module 8 — Surplus vertical-slice acceptance

**Status:** Not started  
**Effort:** 2–4 hours  
**Depends on:** Modules 3–7

- [ ] Seed two realistic restaurant accounts and at least ten allowed-category listings.
- [ ] Complete publish → search → detail on staging and a real phone.
- [ ] Test expired, paused, sold-out, missing-image, and unauthorized-edit cases.
- [ ] Add tests for the critical listing business rules.
- [ ] Run `npm run check` and remove obsolete demo-only logic.
- [ ] Record bugs separately; do not expand scope during acceptance testing.

**Done gate:** One fake restaurant can publish inventory and another can find it reliably. This is the first genuine product milestone.

---

## Milestone C — Add paid pickup orders

### Module 9 — Order model and state machine

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Module 8

- [ ] Add `orders`, `order_items`, `payments`, and `events` tables.
- [ ] Copy purchased item details into immutable `order_items` records.
- [ ] Define explicit order, payment, and fulfillment states.
- [ ] Define allowed state transitions in one server-side domain module.
- [ ] Reserve inventory atomically and prevent overselling.
- [ ] Add organization-scoped buyer/seller read policies.
- [ ] Add transition, concurrency, and insufficient-inventory tests.

**Done gate:** Two simultaneous attempts cannot buy the same last unit, and invalid status transitions are rejected.

### Module 10 — Stripe Connect seller onboarding

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Module 9 and the Stripe funds-flow decision

- [ ] Create the Stripe test account and Connect platform configuration.
- [ ] Choose and document the marketplace charge/payout structure with counsel/accounting input.
- [ ] Create connected accounts from server-only code.
- [ ] Add Stripe-hosted seller onboarding and return/refresh handling.
- [ ] Store only provider IDs and onboarding status—never sensitive bank data.
- [ ] Block selling when payout requirements are incomplete.
- [ ] Handle an abandoned or expired onboarding link.

**Done gate:** A test seller can complete Stripe onboarding and the app accurately reflects whether payouts are enabled.

### Module 11 — Pricing, fees, and checkout

**Status:** Not started  
**Effort:** 5–8 hours  
**Depends on:** Modules 9–10

- [ ] Implement integer-cent subtotal, fixed commission, and minimum-fee rules.
- [ ] Keep one seller per order.
- [ ] Recalculate price and availability on the server at checkout.
- [ ] Create a checkout session or payment flow from server-only code.
- [ ] Make payment creation idempotent.
- [ ] Show a complete price breakdown before payment.
- [ ] Handle stale price, expired listing, changed quantity, and unavailable inventory.
- [ ] Add fee-calculation boundary tests.

**Done gate:** A buyer can pay for one seller's order in Stripe test mode, with no client-controlled price or fee inputs.

### Module 12 — Payment webhooks, receipts, and order views

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Module 11

- [ ] Authenticate Stripe webhook signatures.
- [ ] Store provider event IDs and make retries idempotent.
- [ ] Move order/payment state only from verified server events.
- [ ] Add buyer and seller order-detail views.
- [ ] Add receipt emails.
- [ ] Surface failed and incomplete payments with a safe retry path.
- [ ] Test duplicate, delayed, and out-of-order webhook events.

**Done gate:** Duplicate Stripe events do not duplicate charges, orders, inventory reservations, or emails.

### Module 13 — Pickup fulfillment, cancellation, and refunds

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Module 12

- [ ] Let the seller confirm the order and set a ready time.
- [ ] Generate a pickup verification code.
- [ ] Let the buyer confirm pickup and quantity/condition acceptance.
- [ ] Define buyer, seller, and system cancellation rules by order state.
- [ ] Add full and permitted partial refund handling.
- [ ] Restore reserved inventory when cancellation rules require it.
- [ ] Record every state-changing action in the event log.
- [ ] Test no-show, seller rejection, expired pickup, and refund failure.

**Done gate:** Two test restaurants can complete and refund a real test-mode pickup transaction end to end.

---

## Milestone D — Add Uber Direct delivery

### Module 14 — Delivery model, provider adapter, and quotes

**Status:** Not started  
**Effort:** 3–6 hours  
**Depends on:** Module 13 and Uber sandbox access

- [ ] Add `deliveries` and delivery-event records.
- [ ] Define a provider-neutral delivery interface backed only by Uber Direct for MVP.
- [ ] Request delivery quotes from server-only code.
- [ ] Store quote amount, expiry, provider reference, and addresses.
- [ ] Requote when a quote expires or order details change.
- [ ] Show pickup versus delivery and the exact delivery fee at checkout.
- [ ] Test provider timeout, invalid address, and expired quote.

**Done gate:** Checkout can obtain and safely reject or accept a valid Uber sandbox quote without exposing credentials.

### Module 15 — Delivery creation and authenticated webhooks

**Status:** Not started  
**Effort:** 5–8 hours  
**Depends on:** Module 14

- [ ] Create delivery only after payment and seller readiness conditions are met.
- [ ] Use an idempotency key so retries cannot summon multiple couriers.
- [ ] Authenticate Uber webhook requests.
- [ ] Store provider event IDs and map provider states to internal states.
- [ ] Handle delayed, duplicate, and out-of-order delivery events.
- [ ] Expose failed creation for retry or cancellation instead of silently stalling.

**Done gate:** Replaying any request or webhook does not create a second courier or corrupt the order state.

### Module 16 — Tracking, proof, and delivery recovery

**Status:** Not started  
**Effort:** 3–6 hours  
**Depends on:** Module 15

- [ ] Show courier status and provider tracking link to buyer and seller.
- [ ] Record pickup, drop-off, cancellation, and proof-of-delivery details.
- [ ] Define who can cancel at each delivery stage and who pays the resulting fee.
- [ ] Reconcile delivery failure with order, payment, refund, and inventory state.
- [ ] Add support-visible delivery timeline and raw provider reference.
- [ ] Complete one sandbox delivery end to end.

**Done gate:** A delivery completes or fails visibly and recoverably, with no manual dispatch path hidden behind the app.

---

## Milestone E — Add SOS priority fulfillment

### Module 17 — SOS request and matching

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Module 13; Module 16 for delivered SOS

- [ ] Add `sos_requests` with product, acceptable substitutes, quantity, radius, maximum price, required-by time, and status.
- [ ] Build the mobile SOS request form.
- [ ] Match eligible sellers by category, distance, and deadline.
- [ ] Expire requests automatically after 30–120 minutes.
- [ ] Add RLS so request details are visible only to eligible parties.
- [ ] Add empty, expired, cancelled, and no-match states.

**Done gate:** A buyer can publish a time-limited request and eligible nearby sellers can see it without staff matching.

### Module 18 — Seller offers and buyer acceptance

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Module 17

- [ ] Add `offers` with quantity, price, ready time, substitutions, and expiration.
- [ ] Let eligible sellers submit, revise, or withdraw an offer.
- [ ] Let the buyer compare and accept one valid offer.
- [ ] Atomically close competing offers after acceptance.
- [ ] Convert the accepted offer into the existing order pipeline.
- [ ] Reuse checkout, payment, pickup, and delivery code rather than building an SOS-specific copy.
- [ ] Test simultaneous acceptance, expired offers, and seller withdrawal.

**Done gate:** An accepted offer becomes a normal order exactly once, and all competing offers close safely.

### Module 19 — Transactional notifications

**Status:** Not started  
**Effort:** 2–5 hours  
**Depends on:** Modules 12, 16, and 18

- [ ] Add Resend through a server-only notification adapter.
- [ ] Send only essential account, order, delivery, SOS, and offer emails.
- [ ] Deduplicate notifications using event records.
- [ ] Add retry and failure visibility.
- [ ] Keep marketing alerts and saved searches out of the MVP.

**Done gate:** Each critical event produces at most one useful notification, and a notification failure never corrupts the transaction.

---

## Milestone F — Make the beta supportable

### Module 20 — Verification, documents, and category controls

**Status:** Not started  
**Effort:** 4–7 hours  
**Depends on:** Module 8 and written category rules

- [ ] Add restaurant verification and permit-document status.
- [ ] Add a small admin verification queue.
- [ ] Gate selling, payout, and restricted categories by verification status.
- [ ] Add server-controlled category enable/disable settings.
- [ ] Preserve source invoice reference, lot/best-by data, and transaction timestamps.
- [ ] Add an onboarding checklist showing incomplete requirements.

**Done gate:** An unverified or ineligible restaurant cannot list or transact in a blocked category, even by bypassing the UI.

### Module 21 — Support, disputes, and recovery tools

**Status:** Not started  
**Effort:** 3–6 hours  
**Depends on:** Modules 13 and 16

- [ ] Add a support-only order timeline using the event log.
- [ ] Add dispute intake with reason, evidence, amount, and status.
- [ ] Add controlled refund/retry/cancel actions with permissions.
- [ ] Require an internal reason for every manual action.
- [ ] Prevent direct arbitrary status editing.
- [ ] Test recovery from failed payment, failed refund, and failed delivery creation.

**Done gate:** A failed transaction can be diagnosed and recovered without editing database rows by hand.

### Module 22 — Monitoring, analytics, and audit integrity

**Status:** Not started  
**Effort:** 3–6 hours  
**Depends on:** Modules 12, 16, and 19

- [ ] Add Sentry for server, client, and provider-integration failures.
- [ ] Add PostHog events for the core funnel only.
- [ ] Alert on failed or repeatedly retried Stripe and Uber webhooks.
- [ ] Track started orders, completed orders, founder intervention, cancellations, refunds, delivery cost, GMV, and contribution.
- [ ] Redact credentials, sensitive documents, and unnecessary personal data from logs.
- [ ] Verify the audit event log cannot be edited by restaurant users.

**Done gate:** A failed payment or delivery is visible before a restaurant has to report it, and the beta metrics can be calculated from recorded data.

### Module 23 — Private-beta acceptance

**Status:** Not started  
**Effort:** 5–8 hours  
**Depends on:** Modules 0–22 and required business gates

- [ ] Complete separate buyer, seller, pickup, delivery, SOS, cancellation, refund, and dispute test scripts.
- [ ] Test on current iPhone Safari and Android Chrome.
- [ ] Test two restaurants completing the same flow without founder intervention.
- [ ] Confirm there are no duplicate payment or delivery requests.
- [ ] Confirm all failed states are visible and recoverable.
- [ ] Seed three to five design-partner accounts with realistic listings.
- [ ] Add counsel-reviewed terms, privacy, category, and transaction placeholders before real use.
- [ ] Complete at least ten real private-beta transactions before broadening the geography or feature set.

**Done gate:** At least 90% of started paid orders complete without founder intervention, with no duplicate payments or courier requests.

---

## Parallel business gates

These should progress alongside the build. They are not excuses to add more software.

- [ ] Select one specific 3–5 mile Los Angeles launch cluster.
- [ ] Recruit three to five design-partner restaurants.
- [ ] Get written guidance on approved-source and invoice/traceability requirements.
- [ ] Define the initial allowed-category policy; keep prepared/opened/time-controlled food disabled.
- [ ] Confirm the Stripe Connect legal entity and funds-flow structure.
- [ ] Open the Uber Direct account, add billing, and request production approval.
- [ ] Confirm insurance, transaction terms, refund responsibility, and delivery liability before real transactions.
- [ ] Choose the initial fee schedule and minimum delivered basket from documented unit economics.

## Scope lock until the private-beta gate passes

Do not add native apps, multi-seller carts, POS/accounting integrations, chat, ratings, subscriptions, multiple delivery providers, forecasting, automated purchasing, auctions, algorithmic surge pricing, multiple cities, owned delivery, warehousing, or platform-owned inventory.

## Recommended immediate sequence

1. Finish Module 0 by pushing the repository to GitHub.
2. Complete Module 1 and obtain a working staging URL.
3. Complete Module 2 with two real staging identities and a phone test.
4. Build Modules 3–8 as the next full vertical slice.
5. Stop and test the surplus workflow before touching Stripe.

At roughly 8–12 focused hours per week, reaching the surplus prototype should take about 2–3 weeks from the current scaffold. A reliable feature-complete private beta is more realistically an additional 6–9 weeks, subject to provider setup and external decisions. The earlier 6–8 week target remains possible only if integrations work cleanly and scope stays locked.
