import Link from 'next/link';
// import { useState, useEffect } from 'react';
import { Carousel } from '@/components/carousel/Carousel';
import { ProductCard } from '@/components/productCard/ProductCard';
import { Searching } from '@/components/searching/Searching';
import { MockProductCard } from '@/components/mockProductCard/MockProductCard';
import { getProducts } from '@/api/products';
// import { Product } from '@/interfaces/product.interface';
import { carouselImages } from '@/interfaces/carousel.interface';
import { demoProducts } from '@/helpers';
import styles from './page.module.css';

export default async function Home() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const products = await getProducts();

  // useEffect(() => {
  //   const getLastIncomeProducts = async () => {
  //     setIsLoading(true);
  //     try {
  //       const incomeProducts = await getProducts();

  //       if (incomeProducts) {
  //         setProducts(incomeProducts);
  //       }
  //     } catch (err) {
  //       console.error('Error loading incomeProducts:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   getLastIncomeProducts();
  // }, []);

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

        {/* {isLoading && <div className={styles.loading}>Loading...</div>} */}

        <ul className={styles.list}>
          {products?.length === 0 && demoProducts.map((product) => (
            <MockProductCard key={product.id} product={product} />
          ))}
        </ul>

        <ul className={styles.list}>
          {products?.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
    </section>
  );
}