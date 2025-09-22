// import { notFound } from 'next/navigation'

type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  // if (!(await params).id) {
  //   notFound();
  // }

  return (
    <div>My product: {(await params).id}</div>
  )
}