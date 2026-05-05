create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text,
  avatar_url text,
  state text not null default 'logged_in',
  created_at timestamptz not null default now()
);

create table if not exists public.pets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  name text,
  avatar_url text,
  state text not null default 'active',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.rewards (
  user_id uuid primary key references public.users(id) on delete cascade,
  status text not null default 'inactive',
  points integer not null default 0,
  updated_at timestamptz not null default now()
);

create or replace view public.header_view as
select
  u.id as user_id,
  u.name as user_name,
  u.avatar_url as user_avatar,
  coalesce(n.notifications_count, 0) as notifications_count,
  coalesce(n.notifications_type, array[]::text[]) as notifications_type,
  coalesce(r.status, 'inactive') as rewards_status,
  coalesce(r.points, 0) as rewards_points
from public.users u
left join lateral (
  select count(*)::integer as notifications_count, array_agg(distinct type) as notifications_type
  from public.notifications
  where notifications.user_id = u.id and notifications.read_at is null
) n on true
left join public.rewards r on r.user_id = u.id;
