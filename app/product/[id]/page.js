import { supabase } from '@/lib/supabase';
import ProductClient from './ProductClient';

// ✅ توليد الصفحات مسبقاً أثناء البناء
export async function generateStaticParams() {
  const { data: products } = await supabase
    .from('products')
    .select('id');

  return (products || []).map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }) {
  const { id } = await params;

  // ✅ جلب الأعمدة المحددة فقط - مش select('*')
  const { data: product, error } = await supabase
    .from('products')
    .select('id, name, description, price, category, image, images, in_stock')
    .eq('id', id)
    .single();

  if (error || !product) {
    return <ProductClient product={null} />;
  }

  return <ProductClient product={product} />;
}