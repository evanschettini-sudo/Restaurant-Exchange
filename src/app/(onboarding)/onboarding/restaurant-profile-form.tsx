"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

import {
  createRestaurantOrganization,
  type OnboardingState,
} from "@/app/(onboarding)/onboarding/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: OnboardingState = {};

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return <p className="text-sm text-red-700">{errors[0]}</p>;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full sm:w-auto" size="lg" disabled={pending}>
      {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
      Create restaurant profile
    </Button>
  );
}

export function RestaurantProfileForm() {
  const [state, formAction] = useActionState(createRestaurantOrganization, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-6">
      <div className="space-y-2">
        <Label htmlFor="displayName">Your name</Label>
        <Input id="displayName" name="displayName" autoComplete="name" required />
        <FieldError errors={state.fieldErrors?.displayName} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="restaurantName">Restaurant name</Label>
        <Input
          id="restaurantName"
          name="restaurantName"
          autoComplete="organization"
          required
        />
        <FieldError errors={state.fieldErrors?.restaurantName} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Restaurant phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(310) 555-0182"
          required
        />
        <FieldError errors={state.fieldErrors?.phone} />
      </div>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-stone-950">Pickup address</legend>
        <div className="space-y-2">
          <Label htmlFor="addressLine1">Street address</Label>
          <Input id="addressLine1" name="addressLine1" autoComplete="address-line1" required />
          <FieldError errors={state.fieldErrors?.addressLine1} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addressLine2">Suite or unit (optional)</Label>
          <Input id="addressLine2" name="addressLine2" autoComplete="address-line2" />
          <FieldError errors={state.fieldErrors?.addressLine2} />
        </div>
        <div className="grid gap-4 sm:grid-cols-[1fr_6rem_8rem]">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue="Los Angeles" autoComplete="address-level2" required />
            <FieldError errors={state.fieldErrors?.city} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" defaultValue="CA" maxLength={2} autoComplete="address-level1" required />
            <FieldError errors={state.fieldErrors?.state} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postalCode">ZIP code</Label>
            <Input id="postalCode" name="postalCode" inputMode="numeric" maxLength={5} autoComplete="postal-code" required />
            <FieldError errors={state.fieldErrors?.postalCode} />
          </div>
        </div>
      </fieldset>

      {state.message ? (
        <p className="rounded-xl bg-red-50 p-3 text-sm text-red-800" role="alert">
          {state.message}
        </p>
      ) : null}

      <div className="flex justify-end border-t border-stone-200 pt-6">
        <SubmitButton />
      </div>
    </form>
  );
}
