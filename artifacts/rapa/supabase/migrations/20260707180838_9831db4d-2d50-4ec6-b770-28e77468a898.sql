
CREATE TYPE public.mood_kind AS ENUM ('calmo','presente','fluido','vibrante','reflexivo');
CREATE TYPE public.entry_kind AS ENUM ('marco','reflexao','humor','meditacao');

CREATE TABLE public.mood_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  mood public.mood_kind NOT NULL,
  logged_on date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, logged_on)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.mood_logs TO authenticated;
GRANT ALL ON public.mood_logs TO service_role;
ALTER TABLE public.mood_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own moods select" ON public.mood_logs FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own moods insert" ON public.mood_logs FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own moods update" ON public.mood_logs FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own moods delete" ON public.mood_logs FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  kind public.entry_kind NOT NULL DEFAULT 'reflexao',
  title text,
  content text NOT NULL,
  entry_date date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.journal_entries TO authenticated;
GRANT ALL ON public.journal_entries TO service_role;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own entries select" ON public.journal_entries FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own entries insert" ON public.journal_entries FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own entries update" ON public.journal_entries FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own entries delete" ON public.journal_entries FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER journal_entries_set_updated_at BEFORE UPDATE ON public.journal_entries FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX journal_entries_user_date_idx ON public.journal_entries (user_id, entry_date DESC);
CREATE INDEX mood_logs_user_date_idx ON public.mood_logs (user_id, logged_on DESC);

-- Bússola filosófica no perfil (alimenta o KAI)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS philosophy text NOT NULL DEFAULT 'maia';
