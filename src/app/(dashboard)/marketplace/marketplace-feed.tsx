"use client";

import { useMemo, useState } from "react";
import { Clock3, MapPin, Search } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { demoListings } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

const categories = ["All", "Produce", "Dry goods", "Disposables"] as const;

export function MarketplaceFeed() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const listings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return demoListings.filter(
      (listing) =>
        (category === "All" || listing.category === category) &&
        (!normalizedQuery ||
          listing.title.toLowerCase().includes(normalizedQuery) ||
          listing.seller.toLowerCase().includes(normalizedQuery)),
    );
  }, [category, query]);

  return (
    <>
      <div className="relative mt-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-stone-400" />
        <Input
          className="pl-10"
          type="search"
          placeholder="Search demo inventory"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={cn(
              "shrink-0 rounded-full px-3 py-2 text-sm font-medium transition-colors",
              category === item
                ? "bg-emerald-800 text-white"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-100",
            )}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {listings.length ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <Badge>{listing.category}</Badge>
                  <span className="text-xs font-medium text-stone-500">
                    {listing.quantity} {listing.quantity === 1 ? listing.unit : `${listing.unit}s`} available
                  </span>
                </div>
                <CardTitle>{listing.title}</CardTitle>
                <p className="text-sm text-stone-500">{listing.seller}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-2xl font-semibold text-stone-950">
                      ${listing.price}
                    </span>
                    <span className="ml-1 text-sm text-stone-500">/ {listing.unit}</span>
                    <p className="mt-1 text-xs text-stone-400 line-through">
                      ${listing.retailPrice} distributor price
                    </p>
                  </div>
                  <div className="space-y-1 text-right text-xs text-stone-500">
                    <p className="flex items-center justify-end gap-1">
                      <MapPin className="size-3.5" /> {listing.distanceMiles} mi
                    </p>
                    <p className="flex items-center justify-end gap-1">
                      <Clock3 className="size-3.5" /> {listing.expiresIn} left
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" disabled>
                  Checkout begins in Sprint 2
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center text-sm text-stone-500">
          No demo inventory matches that search.
        </div>
      )}
    </>
  );
}
