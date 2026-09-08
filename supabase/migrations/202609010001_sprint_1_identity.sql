begin;

create extension if not exists pgcrypto with schema extensions;

create type public.organization_role as enum ('owner', 'admin', 'staff');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_display_name_length check (
    display_name is null or char_length(display_name) between 2 and 80
  )
);

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  phone text not null,
  address_line_1 text not null,
  address_line_2 text,
  city text not null default 'Los Angeles',
  state text not null default 'CA',
  postal_code text not null,
  latitude double precision,
  longitude double precision,
  created_by uuid not null references auth.users (id),
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint organizations_name_length check (char_length(name) between 2 and 120),
  constraint organizations_address_line_1_length check (
    char_length(address_line_1) between 3 and 120
  ),
  constraint organizations_address_line_2_length check (
    address_line_2 is null or char_length(address_line_2) <= 120
  ),
  constraint organizations_city_length check (char_length(city) between 2 and 80),
  constraint organizations_phone_e164 check (phone ~ '^\+[1-9][0-9]{7,14}$'),
  constraint organizations_state_code check (state ~ '^[A-Z]{2}$'),
  constraint organizations_postal_code check (postal_code ~ '^[0-9]{5}$'),
  constraint organizations_latitude_range check (
    latitude is null or latitude between -90 and 90
  ),
  constraint organizations_longitude_range check (
    longitude is null or longitude between -180 and 180
  )
);

create table public.organization_members (
  organization_id uuid not null references public.organizations (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role public.organization_role not null default 'staff',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create index organization_members_user_id_idx
  on public.organization_members (user_id);
create index organizations_location_idx
  on public.organizations (city, state, postal_code);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger organizations_set_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, phone)
  values (new.id, new.phone)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create function public.slugify(input text)
returns text
language sql
immutable
strict
parallel safe
set search_path = ''
as $$
  select trim(both '-' from regexp_replace(lower(input), '[^a-z0-9]+', '-', 'g'));
$$;

create function public.is_organization_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members membership
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
  );
$$;

create function public.has_organization_role(
  target_organization_id uuid,
  allowed_roles public.organization_role[]
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.organization_members membership
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
      and membership.role = any(allowed_roles)
  );
$$;

create function public.create_restaurant_organization(
  p_name text,
  p_phone text,
  p_address_line_1 text,
  p_address_line_2 text,
  p_city text,
  p_state text,
  p_postal_code text
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  organization_id uuid := gen_random_uuid();
  base_slug text;
  organization_slug text;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(current_user_id::text, 0));

  if exists (
    select 1 from public.organization_members where user_id = current_user_id
  ) then
    raise exception 'User already belongs to a restaurant organization';
  end if;

  base_slug := public.slugify(p_name);
  if base_slug = '' then
    base_slug := 'restaurant';
  end if;

  organization_slug := base_slug;
  if exists (select 1 from public.organizations where slug = organization_slug) then
    organization_slug := base_slug || '-' || substring(organization_id::text from 1 for 6);
  end if;

  insert into public.profiles (id, phone)
  values (current_user_id, p_phone)
  on conflict (id) do update set phone = excluded.phone;

  insert into public.organizations (
    id,
    name,
    slug,
    phone,
    address_line_1,
    address_line_2,
    city,
    state,
    postal_code,
    created_by,
    onboarding_completed_at
  ) values (
    organization_id,
    trim(p_name),
    organization_slug,
    p_phone,
    trim(p_address_line_1),
    nullif(trim(p_address_line_2), ''),
    trim(p_city),
    upper(trim(p_state)),
    trim(p_postal_code),
    current_user_id,
    now()
  );

  insert into public.organization_members (organization_id, user_id, role)
  values (organization_id, current_user_id, 'owner');

  return organization_id;
end;
$$;

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;

create policy "Users can read their own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Members can read their organization"
on public.organizations for select
to authenticated
using (public.is_organization_member(id));

create policy "Owners and admins can update their organization"
on public.organizations for update
to authenticated
using (public.has_organization_role(id, array['owner', 'admin']::public.organization_role[]))
with check (public.has_organization_role(id, array['owner', 'admin']::public.organization_role[]));

create policy "Members can read organization membership"
on public.organization_members for select
to authenticated
using (public.is_organization_member(organization_id));

create policy "Owners can update organization membership"
on public.organization_members for update
to authenticated
using (public.has_organization_role(organization_id, array['owner']::public.organization_role[]))
with check (public.has_organization_role(organization_id, array['owner']::public.organization_role[]));

create policy "Owners can remove organization membership"
on public.organization_members for delete
to authenticated
using (public.has_organization_role(organization_id, array['owner']::public.organization_role[]));

revoke all on function public.create_restaurant_organization(
  text, text, text, text, text, text, text
) from public;
grant execute on function public.create_restaurant_organization(
  text, text, text, text, text, text, text
) to authenticated;

revoke all on function public.is_organization_member(uuid) from public;
grant execute on function public.is_organization_member(uuid) to authenticated;

revoke all on function public.has_organization_role(
  uuid, public.organization_role[]
) from public;
grant execute on function public.has_organization_role(
  uuid, public.organization_role[]
) to authenticated;

commit;
