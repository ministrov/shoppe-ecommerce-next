// import { getProduct } from '@/api/product';
import { notFound } from 'next/navigation';

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = (await params);
  // const product = await getProduct(id);

  // console.log(product);

  if (id === 'invalid' || id === 'test' || id === '0') {
    notFound()
  }

  return (
    <div style={{ paddingTop: '128px' }}>
      <h1>Product Page</h1>
      <p>Product ID: {id}</p>
    </div>
  )
}