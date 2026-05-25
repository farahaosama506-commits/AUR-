import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

// GET - جلب كل الطلبات
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, orders: data || [] });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message, orders: [] }, { status: 500 });
  }
}

// POST - إنشاء طلب جديد
export async function POST(request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('orders')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, order: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}