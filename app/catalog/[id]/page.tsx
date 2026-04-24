import getProduct from '@/api/product';
import { Product } from '@/components/product/Product';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  // Если продукт не найден, показываем 404
  if (!product) {
    notFound();
  }

  return (
    <Product product={product} />
  )
}