import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Leaf } from "lucide-react";

import { RestaurantProfileForm } from "@/app/(onboarding)/onboarding/restaurant-profile-form";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getOrganizationForUser } from "@/lib/organizations";

export const metadata: Metadata = { title: "Create restaurant profile" };
export const dynamic = "force-dynamic";

export default async function OnboardingPage() {
  const user = await requireAuthenticatedUser();
  const existingOrganization = await getOrganizationForUser(user.id);
  if (existingOrganization) redirect("/marketplace");

  return (
    <main className="min-h-dvh bg-stone-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-800 text-white">
            <Leaf className="size-5" />
          </span>
          <span className="font-semibold">Restaurant Efficiency Market</span>
        </div>
        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm font-semibold text-emerald-800">One last step</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
            Create your restaurant profile
          </h1>
          <p className="mt-3 max-w-xl leading-7 text-stone-600">
            This address becomes the default pickup and delivery location. It is shared only with counterparties on confirmed orders.
          </p>
          <RestaurantProfileForm />
        </section>
      </div>
    </main>
  );
}
