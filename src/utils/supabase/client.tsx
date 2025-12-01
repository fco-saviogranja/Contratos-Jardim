import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Cliente Supabase para o frontend
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
