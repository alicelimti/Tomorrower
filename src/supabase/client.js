import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth 헬퍼
export const auth = supabase.auth;

// DB 헬퍼 (테이블명을 인자로 받아 사용)
// 사용 예: db('exam_schedules').select('*')
export const db = (table) => supabase.from(table);
