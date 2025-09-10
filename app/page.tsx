'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Carousel } from '@/components/carousel/Carousel';
import { ProductCard } from '@/components/productCard/ProductCard';
import { getProducts } from '@/api/products';
import { Searching } from '@/components/searching/Searching';
import styles from './page.module.css';
import { Product } from '@/interfaces/product.interface';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

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
  console.log(products);
  console.log(typeof products);
  // console.log(lastIncomeProducts);
  return (
    <section>
      <div className={styles.searchMobile}>
        <Searching />
      </div>

      <Carousel />

      <section className={styles.newIncome}>
        <header className={styles.header}>
          <h2>Последние поступления</h2>

          <Link href={'/catalog'} >Все</Link>
        </header>

        <ul className={styles.list}>
          {products?.slice(0, 6).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </section>
    </section>
  );
}