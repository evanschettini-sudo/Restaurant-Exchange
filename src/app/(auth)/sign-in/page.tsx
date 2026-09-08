import type { Metadata } from "next";
import { Leaf } from "lucide-react";

import { SignInForm } from "@/app/(auth)/sign-in/sign-in-form";
import { hasSupabaseEnv } from "@/lib/env";

export const metadata: Metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default function SignInPage() {
  const configured = hasSupabaseEnv();

  return (
    <main className="grid min-h-dvh bg-stone-50 lg:grid-cols-2">
      <section className="hidden bg-emerald-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 font-semibold">
          <span className="grid size-10 place-items-center rounded-xl bg-white/10">
            <Leaf className="size-5" />
          </span>
          Restaurant Efficiency Market
        </div>
        <div className="max-w-xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Private beta · Los Angeles
          </p>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight">
            Turn excess inventory into working capital.
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-emerald-100/80">
            Buy nearby surplus or fill a same-day shortage without another distributor run.
          </p>
        </div>
        <p className="text-sm text-emerald-100/60">Built for restaurant operators.</p>
      </section>

      <section className="flex items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-800 text-white">
              <Leaf className="size-5" />
            </span>
            <span className="font-semibold">Restaurant Efficiency Market</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950">Sign in</h2>
          <p className="mt-2 text-stone-600">
            We’ll text you a one-time verification code.
          </p>

          {!configured ? (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Supabase is not configured yet. Copy <code>.env.example</code> to{" "}
              <code>.env.local</code> and add the local project URL and anon key.
            </div>
          ) : null}

          <SignInForm configured={configured} />
          <p className="mt-6 text-xs leading-5 text-stone-500">
            By continuing, you confirm that you are authorized to represent your restaurant.
          </p>
        </div>
      </section>
    </main>
  );
}
