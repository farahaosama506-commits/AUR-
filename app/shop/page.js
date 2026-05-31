import { Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import ShopClient from './ShopClient';

export default async function ShopPage() {
  return (
    <Suspense fallback={<div style={{ textAlign: 'center', padding: '4rem' }}>Loading products...</div>}>
      <ShopContent />
    </Suspense>
  );
}

async function ShopContent() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return <ShopClient products={products || []} error={error?.message} />;
}