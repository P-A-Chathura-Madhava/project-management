import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  budget: number;
  status: 'Planning' | 'Ongoing' | 'Completed';
  created_at: string;
};

export type Site = {
  id: string;
  site_name: string;
  address: string;
  project_id: string;
  created_at: string;
};
