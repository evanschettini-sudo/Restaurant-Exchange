begin;
-- Hosted projects may grant these roles EXECUTE directly through default privileges.
-- Revoking PUBLIC alone does not remove those role-specific grants.
revoke execute on function public.create_restaurant_organization(text, text, text, text, text, text, text) from public, anon;
revoke execute on function public.is_organization_member(uuid) from public, anon;
revoke execute on function public.has_organization_role(uuid, public.organization_role[]) from public, anon;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;
grant execute on function public.create_restaurant_organization(text, text, text, text, text, text, text) to authenticated;
grant execute on function public.is_organization_member(uuid) to authenticated;
grant execute on function public.has_organization_role(uuid, public.organization_role[]) to authenticated;
commit;
