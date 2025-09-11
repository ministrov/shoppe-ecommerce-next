'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Carousel } from '@/components/carousel/Carousel';
import { ProductCard } from '@/components/productCard/ProductCard';
import { Searching } from '@/components/searching/Searching';
import { getProducts } from '@/api/products';
import { Product } from '@/interfaces/product.interface';
import { useApiData } from '@/hooks/useApiData';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { isLoading } = useApiData();

  useEffect(() => {
    const getLastIncomeProducts = async () => {
      try {
        const incomeProducts = await getProducts();

        if (incomeProducts) {
          setProducts(incomeProducts);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    getLastIncomeProducts();
  }, []);

  return (
    <section>
      <div className={styles.searchMobile}>
        <Searching />
      </div>

      <Carousel
        images={[{
          src: '/home-img-1.jpg',
          alt: 'Image 1',
          width: 1248,
          height: 646,
        }]}
      />

      <section className={styles.newIncome}>
        <header className={styles.header}>
          <h2>Последние поступления</h2>

          <Link href={'/catalog'} >Все</Link>
        </header>

        {isLoading && <div className={styles.loading}>Loading</div>}

        {!isLoading && products.length === 0 && (
          <div className={styles.noProducts}>
            Товары не найдены
          </div>
        )}

        <ul className={styles.list}>
          {!isLoading && products.length > 0 && products?.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
    </section>
  );
}