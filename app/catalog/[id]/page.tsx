import { getProduct } from '@/api/product';
import { Product } from '@/components/product/Product';
import { GetProductResponse } from '@/interfaces/product.interface';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = (await params);
  const product = await getProduct(id) as GetProductResponse | undefined;

  // console.log(product);

  if (id === 'invalid' || id === 'test' || id === '0') {
    notFound()
  }

  return (
    <Product product={product} />
  )
}