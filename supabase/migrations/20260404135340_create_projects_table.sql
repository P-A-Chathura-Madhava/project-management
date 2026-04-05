/*
  # Create projects table

  1. New Tables
    - `projects`
      - `id` (uuid, primary key) - Unique identifier for each project
      - `name` (text, not null) - Project name
      - `location` (text, not null) - Project location
      - `start_date` (date, not null) - Project start date
      - `end_date` (date, not null) - Project end date
      - `budget` (numeric, not null) - Project budget
      - `status` (text, not null) - Project status (Planning, Ongoing, Completed)
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on `projects` table
    - Add policy for public read access (since no auth is used)
    - Add policy for public insert access
    - Add policy for public update access
    - Add policy for public delete access
*/

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  budget numeric NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON projects
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON projects
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON projects
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON projects
  FOR DELETE
  TO anon
  USING (true);