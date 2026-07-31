
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS photo_path text;

CREATE POLICY "own journal photos read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'journal-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "own journal photos insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'journal-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "own journal photos update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'journal-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "own journal photos delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'journal-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
