
-- 1. Função pura que calcula o Kin (1..260) de uma data gregoriana (Dreamspell)
CREATE OR REPLACE FUNCTION public.dreamspell_kin(d date)
RETURNS int
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
DECLARE
  y int := extract(year from d)::int;
  anchor_year int;
  anchor date;
  days int;
  ny int;
BEGIN
  anchor_year := CASE WHEN d >= make_date(y, 7, 26) THEN y ELSE y - 1 END;
  anchor := make_date(anchor_year, 7, 26);
  days := (d - anchor);
  ny := anchor_year + 1;
  IF ((ny % 4 = 0 AND ny % 100 <> 0) OR ny % 400 = 0) THEN
    IF make_date(ny, 2, 29) > anchor AND make_date(ny, 2, 29) <= d THEN
      days := days - 1;
    END IF;
  END IF;
  RETURN ((33 + days) % 260 + 260) % 260 + 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.dreamspell_kin(date) TO authenticated, anon;

-- 2. Profiles: data de nascimento + Kin natal
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS birth_date date,
  ADD COLUMN IF NOT EXISTS natal_kin int;

-- Mantém natal_kin sempre coerente com birth_date
CREATE OR REPLACE FUNCTION public.sync_natal_kin()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.birth_date IS NOT NULL THEN
    NEW.natal_kin := public.dreamspell_kin(NEW.birth_date);
  ELSE
    NEW.natal_kin := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_profiles_sync_natal_kin ON public.profiles;
CREATE TRIGGER trg_profiles_sync_natal_kin
  BEFORE INSERT OR UPDATE OF birth_date ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.sync_natal_kin();

-- 3. Journal entries: Kin do dia carimbado automaticamente
ALTER TABLE public.journal_entries
  ADD COLUMN IF NOT EXISTS kin int;

CREATE OR REPLACE FUNCTION public.set_entry_kin()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.kin IS NULL AND NEW.entry_date IS NOT NULL THEN
    NEW.kin := public.dreamspell_kin(NEW.entry_date);
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_journal_entries_set_kin ON public.journal_entries;
CREATE TRIGGER trg_journal_entries_set_kin
  BEFORE INSERT OR UPDATE OF entry_date ON public.journal_entries
  FOR EACH ROW EXECUTE FUNCTION public.set_entry_kin();

-- Backfill do histórico existente
UPDATE public.journal_entries
   SET kin = public.dreamspell_kin(entry_date)
 WHERE kin IS NULL;

CREATE INDEX IF NOT EXISTS idx_journal_entries_user_kin
  ON public.journal_entries (user_id, kin);
