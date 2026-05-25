import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// PUT - تغيير role
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { role } = await request.json();

    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      user_metadata: { role },
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE - حذف مستخدم
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}