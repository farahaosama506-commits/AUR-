'use server';

import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function addToCartAction(productId, userId) {
  if (!userId) {
    return { success: false, message: 'Login required' };
  }

  const { data: existing } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + 1 })
      .eq('id', existing.id);

    if (error) return { success: false, message: error.message };
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert([{ user_id: userId, product_id: productId, quantity: 1 }]);

    if (error) return { success: false, message: error.message };
  }

  revalidatePath('/cart');
  return { success: true };
}

export async function removeFromCartAction(itemId) {
  const { error } = await supabase.from('cart_items').delete().eq('id', itemId);
  if (error) return { success: false, message: error.message };
  revalidatePath('/cart');
  return { success: true };
}

export async function updateCartQuantityAction(itemId, quantity) {
  if (quantity < 1) {
    await supabase.from('cart_items').delete().eq('id', itemId);
  } else {
    await supabase.from('cart_items').update({ quantity }).eq('id', itemId);
  }
  revalidatePath('/cart');
  return { success: true };
}