import type { Metadata } from "next";
import { Siren } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "SOS requests" };

export default function SosPage() {
  return (
    <section>
      <p className="text-sm font-semibold text-red-700">Same-day sourcing</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">SOS requests</h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Urgent buyer requests will collect nearby seller offers, then use the same order pipeline as surplus checkout.
      </p>
      <Card className="mt-8 border-dashed">
        <CardHeader>
          <span className="mb-3 grid size-11 place-items-center rounded-xl bg-red-50 text-red-700">
            <Siren className="size-5" />
          </span>
          <CardTitle>No active SOS requests</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-6 text-stone-500">
          Request creation, seller offers, and surge pricing are deferred until the shared order model is ready.
        </CardContent>
      </Card>
    </section>
  );
}
