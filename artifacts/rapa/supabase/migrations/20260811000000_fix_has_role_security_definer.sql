-- Restore has_role() to SECURITY DEFINER to prevent infinite RLS recursion.
--
-- has_role() is called from RLS policies on user_roles itself. Running as
-- SECURITY INVOKER causes PostgreSQL to re-evaluate those same policies while
-- inside the function, creating an infinite recursion on INSERT/UPDATE/DELETE
-- paths (ERROR: infinite recursion detected in policy for relation "user_roles").
-- SECURITY DEFINER bypasses RLS when the function queries user_roles, which is
-- the standard Supabase-recommended pattern for RLS helper functions.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$function$;
