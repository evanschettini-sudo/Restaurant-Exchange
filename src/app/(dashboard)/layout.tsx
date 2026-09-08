import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getOrganizationForUser } from "@/lib/organizations";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAuthenticatedUser();
  const context = await getOrganizationForUser(user.id);
  if (!context) redirect("/onboarding");

  return <AppShell organizationName={context.organization.name}>{children}</AppShell>;
}
