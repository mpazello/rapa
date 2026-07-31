-- Experiência anual do Dia Fora do Tempo
CREATE TABLE IF NOT EXISTS public.time_out_of_time_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  current_portal INTEGER NOT NULL DEFAULT 0,
  portal_1_closing TEXT,
  portal_2_release TEXT,
  portal_3_gratitude JSONB DEFAULT '[]'::jsonb,
  portal_4_forgiveness TEXT,
  portal_5_celebration TEXT,
  portal_6_intentions JSONB DEFAULT '[]'::jsonb,
  portal_7_renewal TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, year)
);

ALTER TABLE public.time_out_of_time_experience ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.time_out_of_time_experience TO authenticated;
GRANT ALL ON public.time_out_of_time_experience TO service_role;

CREATE POLICY "Users own their DFTDT experience"
  ON public.time_out_of_time_experience
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
