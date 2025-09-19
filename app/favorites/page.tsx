'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/productCard/ProductCard';
import { NoFavorites } from '@/components/noFavorites/NoFavorites';
import { Product } from '@/interfaces/product.interface';
import { useFavorites } from '@/hooks/useFavorite';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';

const API_URL = process.env.NEXT_PUBLIC_API;

export default function Favorites() {
  const { favoritesCount, favoriteIds } = useFavorites();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      setLoading(true);
      setError(null);

      if (favoriteIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        const results = await Promise.allSettled(
          favoriteIds.map(async (id) => {
            const response = await fetch(`${API_URL}/products/${id}`);
            if (!response.ok) throw new Error(`Product ${id} not found`);
            const result = await response.json();
            return result.product;
          })
        );

        const successfulProducts = results
          .filter(result => result.status === 'fulfilled')
          .map(result => (result as PromiseFulfilledResult<Product>).value);

        const failedResults = results.filter(result => result.status === 'rejected');

        if (failedResults.length > 0) {
          console.warn('Some products failed to load:', failedResults);
        }

        setProducts(successfulProducts);
      } catch (error) {
        console.error('Error fetching favorite products:', error);
        setError('Не удалось загрузить избранные товары');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteProducts();
  }, [favoriteIds]);

  if (loading) {
    return (
      <div className={styles.favorites}>
        <h1 className="left">Избранное</h1>
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.favorites}>
        <h1 className="left">Избранное</h1>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className={styles.favorites}>
      <h1 className="left">Избранное</h1>

      {favoritesCount === 0 && <NoFavorites />}

      {products.length === 0 ? (
        <NoFavorites />
      ) : (
        <>
          <p className={styles.favoritesCount}>
            {products.length} товар{products.length % 10 === 1 ? '' : 'ов'} в избранном
          </p>

          <ul className={styles.favoritesList}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};