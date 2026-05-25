import Stripe from 'stripe';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, userEmail, userId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart is empty' }, { status: 400 });
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 1. إنشاء الطلب في Supabase
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        user_id: userId || null,
        user_email: userEmail || 'guest@example.com',
        items: items,
        total_amount: totalAmount,
        status: 'pending',
      }])
      .select()
      .single();

    if (orderError) {
      console.error('Order error:', orderError);
      // كمل حتى لو فشل الطلب - المهم الدفع يشتغل
    }

    // 2. إنشاء جلسة Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}