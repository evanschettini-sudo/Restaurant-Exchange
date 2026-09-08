import type { Metadata } from "next";
import { Camera, PackageOpen, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = { title: "Sell inventory" };

export default function SellPage() {
  return (
    <section>
      <p className="text-sm font-semibold text-emerald-800">Recover working capital</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-950">Sell surplus</h1>
      <p className="mt-2 max-w-2xl text-stone-600">
        Sprint 2 will add verified inventory listings without turning the platform into a warehouse.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Camera, title: "Proof", text: "Invoice or product photo" },
          { icon: PackageOpen, title: "Traceability", text: "Brand, pack, lot, and expiry" },
          { icon: ShieldCheck, title: "Control", text: "Quantity and sale window" },
        ].map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <item.icon className="mb-3 size-5 text-emerald-800" />
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-stone-500">{item.text}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
