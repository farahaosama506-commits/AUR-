import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// PUT - تحديث حالة الطلب
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const { status } = await request.json();

    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}