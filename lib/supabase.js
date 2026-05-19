import { createClient } from '@supabase/supabase-js'

// اكتب القيم مباشرة للتجربة
const supabaseUrl = 'https://kqhlzjdnofukxqsarwtv.supabase.co'
const supabaseAnonKey = 'sb_publishable_SRlfWZ-2zzCVioDm1IXYIQ_GtTG2dOq' // حط الـ anon key الكامل هنا

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase URL or Key is missing!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)