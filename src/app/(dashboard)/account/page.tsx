import type { Metadata } from "next";

import { signOut } from "@/app/(dashboard)/account/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAuthenticatedUser } from "@/lib/auth";
import { getOrganizationForUser } from "@/lib/organizations";
import { formatUsPhone } from "@/lib/phone";

export const metadata: Metadata = { title: "Account" };

export default async function AccountPage() {
  const user = await requireAuthenticatedUser();
  const context = await getOrganizationForUser(user.id);

  if (!context) return null;
  const { organization, role } = context;

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-stone-950">Account</h1>
      <p className="mt-2 text-stone-600">Restaurant identity and access.</p>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{organization.name}</CardTitle>
          <p className="text-sm capitalize text-stone-500">{role}</p>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-stone-500">Phone</dt>
              <dd className="mt-1 text-stone-950">{formatUsPhone(organization.phone)}</dd>
            </div>
            <div>
              <dt className="font-medium text-stone-500">Pickup address</dt>
              <dd className="mt-1 text-stone-950">
                {organization.address_line_1}
                {organization.address_line_2 ? `, ${organization.address_line_2}` : ""}
                <br />
                {organization.city}, {organization.state} {organization.postal_code}
              </dd>
            </div>
          </dl>
          <form action={signOut} className="mt-8 border-t border-stone-200 pt-5">
            <Button variant="outline">Sign out</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
