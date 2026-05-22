import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';
import { loginSchema, formatZodError } from '@/lib/validation';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request) {
  // Rate Limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed, retryAfter } = checkRateLimit(`login:${ip}`, 5, 60000);
  
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${retryAfter}s` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    // Zod Validation
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: formatZodError(result.error) },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: { id: data.user?.id, email },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}