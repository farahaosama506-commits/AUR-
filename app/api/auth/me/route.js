import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { success: false, message: 'غير مصرح' },
        { status: 401 }
      );
    }

    // جلب بيانات إضافية من جدول users إذا كان عندك (اختياري)
    const { data: profile } = await supabase
      .from('users')
      .select('username, role, avatar_url')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: profile?.username || user.user_metadata?.username,
        role: profile?.role || 'user',
        // أي بيانات إضافية تحتاجها
      },
    });

  } catch (err) {
    console.error('Error in /api/auth/me:', err);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ داخلي' },
      { status: 500 }
    );
  }
}