import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { Organization, OrganizationRole } from "@/types/database.generated";

export type CurrentOrganization = {
  organization: Organization;
  role: OrganizationRole;
};

export async function getOrganizationForUser(
  userId: string,
): Promise<CurrentOrganization | null> {
  const supabase = await createServerSupabaseClient();
  const { data: membership, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id, role")
    .eq("user_id", userId)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (membershipError) throw membershipError;
  if (!membership) return null;

  const { data: organization, error: organizationError } = await supabase
    .from("organizations")
    .select("*")
    .eq("id", membership.organization_id)
    .single();

  if (organizationError) throw organizationError;

  return { organization, role: membership.role };
}
