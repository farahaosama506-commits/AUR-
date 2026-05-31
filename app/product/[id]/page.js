import { supabase } from '@/lib/supabase';
import ProductClient from './ProductClient';

export default async function ProductPage({ params }) {
  const { id } = await params;

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    return <ProductClient product={null} />;
  }

  return <ProductClient product={product} />;
}