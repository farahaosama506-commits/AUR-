import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // تحقق من الحقول
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // تسجيل في Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username } // تخزين username في metadata
      }
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 422 }
      );
    }

    // إضافة المستخدم لجدول users
    if (data.user) {
      const { error: dbError } = await supabase
        .from('users')
        .insert([{
          id: data.user.id,
          username,
          email,
          role: 'user'
        }]);

      if (dbError) {
        console.error('DB insert error:', dbError);
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: data.user?.id,
        username,
        email,
        role: 'user'
      }
    });

  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}