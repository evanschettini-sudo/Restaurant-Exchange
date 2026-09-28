-- Run as database owner with psql -v ON_ERROR_STOP=1 -f supabase/tests/identity_smoke.sql
-- Fixtures are rolled back; no persistent users or restaurant data are created.
begin;
do $test$
declare
  user_a uuid := gen_random_uuid();
  user_b uuid := gen_random_uuid();
  org_a uuid;
  org_b uuid;
  visible_count integer;
begin
  insert into auth.users (id, aud, role) values
    (user_a, 'authenticated', 'authenticated'),
    (user_b, 'authenticated', 'authenticated');

  perform set_config('request.jwt.claim.sub', user_a::text, true);
  set local role authenticated;
  org_a := public.create_restaurant_organization(
    'REX Migration Test A', '+13105550182', '100 Test Street', null, 'Los Angeles', 'CA', '90028');
  reset role;
  perform set_config('request.jwt.claim.sub', user_b::text, true);
  set local role authenticated;
  org_b := public.create_restaurant_organization(
    'REX Migration Test B', '+13105550183', '200 Test Street', null, 'Los Angeles', 'CA', '90028');
  select count(*) into visible_count from public.organizations;
  if visible_count <> 1 then raise exception 'Organization isolation failed'; end if;
  if exists (select 1 from public.organizations where id = org_a) then
    raise exception 'Cross-organization read allowed';
  end if;
  update public.organizations set name = 'Unauthorized' where id = org_a;
  get diagnostics visible_count = row_count;
  if visible_count <> 0 then raise exception 'Cross-organization update allowed'; end if;
  if not exists (select 1 from public.organization_members where organization_id = org_b and user_id = user_b and role = 'owner') then
    raise exception 'Owner membership missing';
  end if;
  if (select count(*) from public.profiles) <> 1 then raise exception 'Profile isolation failed'; end if;
  begin
    perform public.create_restaurant_organization(
      'Duplicate', '+13105550183', '200 Test Street', null, 'Los Angeles', 'CA', '90028');
    raise exception 'Duplicate onboarding unexpectedly succeeded';
  exception when raise_exception then
    if sqlerrm <> 'User already belongs to a restaurant organization' then raise; end if;
  end;
  reset role;
  if has_function_privilege('anon', 'public.create_restaurant_organization(text,text,text,text,text,text,text)', 'execute')
    or has_function_privilege('anon', 'public.is_organization_member(uuid)', 'execute')
    or has_function_privilege('anon', 'public.has_organization_role(uuid,public.organization_role[])', 'execute')
    or has_function_privilege('authenticated', 'public.handle_new_user()', 'execute') then
    raise exception 'Identity function privileges are too broad';
  end if;
end
$test$;
rollback;
