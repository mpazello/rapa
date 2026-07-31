REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.grant_admin_to_founder() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_entry_kin() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.sync_natal_kin() FROM PUBLIC, anon, authenticated;