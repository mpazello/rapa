CREATE TABLE public.plasma_words (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  plasma_index SMALLINT NOT NULL CHECK (plasma_index BETWEEN 1 AND 7),
  words TEXT[] NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, plasma_index)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.plasma_words TO authenticated;
GRANT ALL ON public.plasma_words TO service_role;
ALTER TABLE public.plasma_words ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own plasma words" ON public.plasma_words FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);