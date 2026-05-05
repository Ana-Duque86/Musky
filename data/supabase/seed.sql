insert into public.users (id, name, avatar_url, state)
values
  ('00000000-0000-0000-0000-000000000001', 'Eduardo', null, 'logged_in'),
  ('00000000-0000-0000-0000-000000000002', null, null, 'logged_in')
on conflict (id) do update
set name = excluded.name,
    avatar_url = excluded.avatar_url,
    state = excluded.state;

insert into public.pets (id, user_id, name, avatar_url, state, is_active)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Perrín', null, 'active', true)
on conflict (id) do update
set name = excluded.name,
    avatar_url = excluded.avatar_url,
    state = excluded.state,
    is_active = excluded.is_active;

insert into public.notifications (id, user_id, type, title, body, read_at)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000001', 'vaccines', 'Vacuna pendiente', 'Recuerda revisar el calendario de Perrín.', null),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000001', 'appointments', 'Cita veterinaria', 'Tienes una cita próxima.', null),
  ('00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000002', 'payments', 'Pago actualizado', 'Tu último pago se procesó correctamente.', now())
on conflict (id) do update
set type = excluded.type,
    title = excluded.title,
    body = excluded.body,
    read_at = excluded.read_at;

insert into public.rewards (user_id, status, points)
values
  ('00000000-0000-0000-0000-000000000001', 'highlight', 1200),
  ('00000000-0000-0000-0000-000000000002', 'inactive', 0)
on conflict (user_id) do update
set status = excluded.status,
    points = excluded.points,
    updated_at = now();
