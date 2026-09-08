import { Leaf } from "lucide-react";

import { AppNavigation } from "@/components/app-navigation";

type AppShellProps = {
  children: React.ReactNode;
  organizationName: string;
};

export function AppShell({ children, organizationName }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-stone-50">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-stone-200 bg-white p-4 md:flex md:flex-col">
        <div className="mb-8 flex items-center gap-3 px-2 pt-1">
          <span className="grid size-10 place-items-center rounded-xl bg-emerald-800 text-white">
            <Leaf className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold text-stone-950">REM</p>
            <p className="truncate text-xs text-stone-500">{organizationName}</p>
          </div>
        </div>
        <AppNavigation />
        <div className="mt-auto rounded-xl bg-stone-100 p-3 text-xs leading-5 text-stone-600">
          Private beta · Los Angeles
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/90 px-4 py-3 backdrop-blur md:hidden">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-emerald-800 text-white">
              <Leaf className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-800">
                Restaurant Efficiency Market
              </p>
              <p className="truncate text-sm font-semibold text-stone-950">
                {organizationName}
              </p>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 md:pb-10 md:pt-10">
          {children}
        </main>
      </div>

      <div className="md:hidden">
        <AppNavigation />
      </div>
    </div>
  );
}
