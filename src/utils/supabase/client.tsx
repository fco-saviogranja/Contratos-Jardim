import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const SUPABASE_URL = `https://${projectId}.supabase.co`;

export function createClient() {
  return createSupabaseClient(SUPABASE_URL, publicAnonKey);
}
