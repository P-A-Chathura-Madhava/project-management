/*
  # Create sites table

  1. New Tables
    - `sites`
      - `id` (uuid, primary key) - Unique identifier for each site
      - `site_name` (text, not null) - Site name
      - `address` (text, not null) - Site address
      - `project_id` (uuid, not null) - Foreign key reference to projects table
      - `created_at` (timestamptz) - Record creation timestamp

  2. Relationships
    - Foreign key constraint on project_id references projects(id)
    - ON DELETE CASCADE to remove sites when project is deleted

  3. Security
    - Enable RLS on `sites` table
    - Add policy for public read access
    - Add policy for public insert access
    - Add policy for public update access
    - Add policy for public delete access
*/

CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name text NOT NULL,
  address text NOT NULL,
  project_id uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON sites
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON sites
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON sites
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON sites
  FOR DELETE
  TO anon
  USING (true);