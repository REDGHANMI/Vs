
-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);

-- Create RLS policies for documents bucket
CREATE POLICY "Allow public read access on documents" ON storage.objects
FOR SELECT USING (bucket_id = 'documents');

CREATE POLICY "Allow authenticated users to upload documents" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'documents');

CREATE POLICY "Allow authenticated users to update their documents" ON storage.objects
FOR UPDATE USING (bucket_id = 'documents');

CREATE POLICY "Allow authenticated users to delete their documents" ON storage.objects
FOR DELETE USING (bucket_id = 'documents');
