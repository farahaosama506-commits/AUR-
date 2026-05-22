import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('products')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    // Filter by category
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    // Filter featured
    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    // Search by name
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }

    // Pagination
    query = query.range(offset, offset + limit - 1);

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
    console.error('Products API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const { data, error } = await supabase
      .from('products')
      .insert([body])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );

  } catch (error) {
    console.error('Products API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}