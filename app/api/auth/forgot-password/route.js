import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { forgotPasswordSchema } from '@/lib/validation';
import { rateLimit } from '@/lib/rate-limit';

// Rate Limit: 3 محاولات كل دقيقة
const forgotPasswordRateLimit = rateLimit({
  limit: 3,
  windowMs: 60 * 1000,
  message: 'Too many requests. Please try again in a minute.',
});

export async function POST(request) {
  // ✅ Rate Limiting
  const rateLimitResponse = await forgotPasswordRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();

    const result = forgotPasswordSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

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