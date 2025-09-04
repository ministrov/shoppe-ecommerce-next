import { fetchCategories } from '@/api/categories';
import { getProducts } from '@/api/products';
import { Category } from '@/interfaces/category.interface';
import { Product } from '@/interfaces/product.interface';
import { useState, useEffect } from 'react';

export const useApiData = () => {
  const [data, setData] = useState<{ categories: Category[], products: Product[] }>({
    categories: [],
    products: []
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        setIsLoading(true);

        const [categories, products] = await Promise.all([
          fetchCategories(),
          getProducts()
        ]);

        if (!isMounted) return;

        setData({ categories: categories || [], products: products || [] });
      } catch (err) {
        if (!isMounted) return;
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchAllData();

    return () => {
      isMounted = false
    };
  }, []);

  return { data, error, isLoading }
};