create table profiles (
  id uuid references auth.users on delete cascade primary key,
  display_name text,
  tier text not null default 'free' check (tier in ('free','subscriber','admin')),
  paystack_customer_id text,
  subscription_expiry timestamptz,
  created_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Play events, logged by app/api/plays/route.ts for analytics and future
-- royalty tracking. song_slug references Strapi's Song.slug, not a foreign key
-- (Strapi and Supabase are separate Postgres instances).
create table plays (
  id bigint generated always as identity primary key,
  song_slug text not null,
  user_id uuid references auth.users on delete set null,
  played_at timestamptz default now()
);
