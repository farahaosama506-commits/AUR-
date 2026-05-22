import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // تجهيز line_items لـ Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || item.category,
          images: item.image ? [`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${item.image}`] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe يستخدم السنتات
      },
      quantity: item.quantity,
    }));

    // إنشاء Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/cart?canceled=true`,
      metadata: {
        source: 'aure_store',
      },
    });

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment failed' },
      { status: 500 }
    );
  }
}