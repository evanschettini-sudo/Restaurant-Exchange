-- Local development fixtures only. These records never run against hosted projects unless
-- someone explicitly executes this file there.

insert into auth.users (
  instance_id,
  id,
  aud,
  role,
  phone,
  encrypted_password,
  phone_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token,
  email_change_token_new,
  email_change
) values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-4111-8111-111111111111',
  'authenticated',
  'authenticated',
  '+13105550182',
  extensions.crypt('local-demo-only', extensions.gen_salt('bf')),
  now(),
  '{"provider":"phone","providers":["phone"]}'::jsonb,
  '{}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
)
on conflict (id) do nothing;

update public.profiles
set display_name = 'Demo Operator'
where id = '11111111-1111-4111-8111-111111111111';

insert into public.organizations (
  id,
  name,
  slug,
  phone,
  address_line_1,
  city,
  state,
  postal_code,
  latitude,
  longitude,
  created_by,
  onboarding_completed_at
) values (
  '22222222-2222-4222-8222-222222222222',
  'Sunset Kitchen Demo',
  'sunset-kitchen-demo',
  '+13105550182',
  '1500 N Cahuenga Blvd',
  'Los Angeles',
  'CA',
  '90028',
  34.0985,
  -118.3295,
  '11111111-1111-4111-8111-111111111111',
  now()
)
on conflict (id) do nothing;

insert into public.organization_members (organization_id, user_id, role)
values (
  '22222222-2222-4222-8222-222222222222',
  '11111111-1111-4111-8111-111111111111',
  'owner'
)
on conflict (organization_id, user_id) do nothing;
