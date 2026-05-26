import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { registerSchema, formatZodError } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request) {
  // Rate Limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed, retryAfter } = checkRateLimit(`register:${ip}`, 3, 60000);
  
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfter}s` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Zod Validation
    const result = registerSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: formatZodError(result.error) },
        { status: 400 }
      );
    }

    const { username, email, password } = result.data;

    const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { username },
    emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/confirm`,
  },
});
    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { id: data.user?.id, email, username },
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}