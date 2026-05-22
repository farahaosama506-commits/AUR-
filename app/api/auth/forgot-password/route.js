import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { forgotPasswordSchema, formatZodError } from '@/lib/validation';

export async function POST(request) {
  try {
    const body = await request.json();

    // ✅ Zod Validation
    const validation = forgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: formatZodError(validation.error) },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${request.headers.get('origin') || 'http://localhost:3000'}/reset-password`,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Reset code sent to your email',
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}