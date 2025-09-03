type ProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  return (
    <div>My product: {(await params).id}</div>
  )
}