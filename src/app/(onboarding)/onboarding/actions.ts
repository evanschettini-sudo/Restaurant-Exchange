"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAuthenticatedUser } from "@/lib/auth";
import { getOrganizationForUser } from "@/lib/organizations";
import { normalizeUsPhone } from "@/lib/phone";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const onboardingSchema = z.object({
  displayName: z.string().trim().min(2, "Enter your name.").max(80),
  restaurantName: z.string().trim().min(2, "Enter the restaurant name.").max(120),
  phone: z.string().trim().min(1, "Enter a restaurant phone number."),
  addressLine1: z.string().trim().min(3, "Enter the street address.").max(120),
  addressLine2: z.string().trim().max(120),
  city: z.string().trim().min(2, "Enter the city.").max(80),
  state: z.string().trim().length(2, "Use the two-letter state code."),
  postalCode: z.string().trim().regex(/^\d{5}$/, "Enter a 5-digit ZIP code."),
});

export type OnboardingState = {
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function createRestaurantOrganization(
  _previousState: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await requireAuthenticatedUser();
  const existingOrganization = await getOrganizationForUser(user.id);
  if (existingOrganization) redirect("/marketplace");

  const parsed = onboardingSchema.safeParse({
    displayName: formData.get("displayName"),
    restaurantName: formData.get("restaurantName"),
    phone: formData.get("phone"),
    addressLine1: formData.get("addressLine1"),
    addressLine2: formData.get("addressLine2") ?? "",
    city: formData.get("city"),
    state: formData.get("state"),
    postalCode: formData.get("postalCode"),
  });

  if (!parsed.success) {
    return {
      message: "Check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const phone = normalizeUsPhone(parsed.data.phone);
  if (!phone) {
    return {
      message: "Check the highlighted fields.",
      fieldErrors: {
        phone: ["Enter a valid U.S. phone number, including the area code."],
      },
    };
  }

  const supabase = await createServerSupabaseClient();
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ display_name: parsed.data.displayName })
    .eq("id", user.id);

  if (profileError) {
    return { message: "We could not update your operator profile. Try again." };
  }

  const { error: organizationError } = await supabase.rpc(
    "create_restaurant_organization",
    {
      p_name: parsed.data.restaurantName,
      p_phone: phone,
      p_address_line_1: parsed.data.addressLine1,
      p_address_line_2: parsed.data.addressLine2 || null,
      p_city: parsed.data.city,
      p_state: parsed.data.state.toUpperCase(),
      p_postal_code: parsed.data.postalCode,
    },
  );

  if (organizationError) {
    return { message: organizationError.message };
  }

  redirect("/marketplace");
}
