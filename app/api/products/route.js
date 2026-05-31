import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    // ✅ جلب الأعمدة المحددة فقط + pagination
    let query = supabase
      .from('products')
      .select('id, name, price, category, image', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}