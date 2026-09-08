import type { Metadata } from "next";

import { MarketplaceFeed } from "@/app/(dashboard)/marketplace/marketplace-feed";

export const metadata: Metadata = { title: "Marketplace" };

export default function MarketplacePage() {
  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-emerald-800">Within 5 miles</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">
            Available nearby
          </h1>
          <p className="mt-2 text-stone-600">
            Demo inventory for the Sprint 1 application shell.
          </p>
        </div>
      </div>
      <MarketplaceFeed />
    </section>
  );
}
