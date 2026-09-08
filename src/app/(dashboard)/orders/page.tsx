import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight text-stone-950">Orders</h1>
      <p className="mt-2 text-stone-600">Purchases and sales will share one fulfillment timeline.</p>
      <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
        <ClipboardList className="mx-auto size-8 text-stone-400" />
        <p className="mt-4 font-medium text-stone-800">No orders yet</p>
        <p className="mt-1 text-sm text-stone-500">Order history begins with Sprint 2 checkout.</p>
      </div>
    </section>
  );
}
