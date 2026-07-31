
CREATE OR REPLACE FUNCTION public.dreamspell_kin(d date)
RETURNS integer
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $function$
DECLARE
  epoch_date date := make_date(2024, 7, 26);
  epoch_kin  int  := 19;
  raw_days   int;
  feb29s     int;
  lo date; hi date; sgn int;
  y int;
BEGIN
  raw_days := (d - epoch_date);
  IF d = epoch_date THEN
    feb29s := 0;
  ELSIF d > epoch_date THEN
    lo := epoch_date; hi := d; sgn := 1;
  ELSE
    lo := d; hi := epoch_date; sgn := -1;
  END IF;
  IF d <> epoch_date THEN
    feb29s := 0;
    FOR y IN extract(year from lo)::int .. extract(year from hi)::int LOOP
      IF ((y % 4 = 0 AND y % 100 <> 0) OR y % 400 = 0) THEN
        IF make_date(y, 2, 29) > lo AND make_date(y, 2, 29) <= hi THEN
          feb29s := feb29s + 1;
        END IF;
      END IF;
    END LOOP;
    feb29s := feb29s * sgn;
  END IF;
  RETURN ((epoch_kin - 1 + (raw_days - feb29s)) % 260 + 260) % 260 + 1;
END;
$function$;

-- Recalcula kins existentes
UPDATE public.profiles SET birth_date = birth_date WHERE birth_date IS NOT NULL;
UPDATE public.journal_entries SET kin = public.dreamspell_kin(entry_date);
