"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CircleUserRound,
  ClipboardList,
  PackageOpen,
  Search,
  Siren,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navigation: NavigationItem[] = [
  { href: "/marketplace", label: "Market", icon: Search },
  { href: "/sos", label: "SOS", icon: Siren },
  { href: "/sell", label: "Sell", icon: PackageOpen },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/account", label: "Account", icon: CircleUserRound },
];

function NavigationLink({ item }: { item: NavigationItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex min-w-0 items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors",
        "h-14 flex-col px-2 md:h-11 md:flex-row md:justify-start md:px-3",
        active
          ? "bg-emerald-50 text-emerald-900"
          : "text-stone-500 hover:bg-stone-100 hover:text-stone-900",
      )}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <span className="truncate text-[11px] md:text-sm">{item.label}</span>
    </Link>
  );
}

export function AppNavigation() {
  return (
    <>
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-stone-200 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur md:static md:flex md:flex-col md:border-0 md:bg-transparent md:p-0"
      >
        {navigation.map((item) => (
          <NavigationLink key={item.href} item={item} />
        ))}
      </nav>
    </>
  );
}
