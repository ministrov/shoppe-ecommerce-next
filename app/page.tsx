import Link from 'next/link';
import { Carousel } from '@/components/carousel/Carousel';
import { ProductCard } from '@/components/productCard/ProductCard';
import { Searching } from '@/components/searching/Searching';
import { MockProductCard } from '@/components/mockProductCard/MockProductCard';
import getProducts from '@/api/products';
import { carouselImages } from '@/interfaces/carousel.interface';
import { demoProducts } from '@/helpers';
import styles from './page.module.css';

export default async function Home() {
  const products = await getProducts();

  let itemsList;

  if (!products || products.length === 0) {
    itemsList = demoProducts.map(product => (
      <MockProductCard key={product.id} product={product} />
    ));
  } else {
    itemsList = products.slice(0, 6).map(product => (
      <ProductCard key={product.id} product={product} />
    ));
  }

  return (
    <section>
      <h1 className="visually-hidden">Секция домашней страницы</h1>
      <div className={styles.searchMobile}>
        <Searching />
      </div>

      <Carousel
        images={carouselImages}
      />

      <section className={styles.newIncome}>
        <h2 className="visually-hidden">Секция со списком последних поступлений</h2>
        <header className={styles.header}>
          <h3>Последние поступления</h3>

          <Link href={'/catalog'} >Все</Link>
        </header>

        <ul className={styles.list}>
          {itemsList}
        </ul>
      </section>
    </section>
  );
}