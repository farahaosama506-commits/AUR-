import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET - جلب كل المستخدمين
export async function GET() {
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;

    const safeUsers = users?.map(user => ({
      id: user.id,
      email: user.email || 'N/A',
      username: user.user_metadata?.username || 'N/A',
      role: user.user_metadata?.role || 'user',
      created_at: user.created_at,
      last_sign_in: user.last_sign_in_at,
    })) || [];

    return NextResponse.json({ success: true, users: safeUsers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message, users: [] }, { status: 500 });
  }
}

// POST - إضافة مستخدم جديد
export async function POST(request) {
  try {
    const { email, password, username, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { username: username || email.split('@')[0], role: role || 'user' },
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      user: { id: data.user.id, email: data.user.email, username, role },
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}