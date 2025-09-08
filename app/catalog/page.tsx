'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { InputField } from '@/components/inputField/InputField';
import { Searching } from '@/components/searching/Searching';
import { SelectField } from '@/components/selectField/SelectField';
import { ProductCard } from '@/components/productCard/ProductCard';
// import { Switch } from "@/components/ui/switch";
// import { Slider } from "@/components/ui/slider";
import { Category } from '@/interfaces/category.interface';
import { Product, GetProductsResponse } from '@/interfaces/product.interface';
import { API_URL } from '@/helpers';
import { useApiData } from '@/hooks/useApiData';
import cn from 'classnames';
import styles from './page.module.css';

export default function Catalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Получаем параметры из URL
  const category_id = searchParams.get('category_id') || '';
  const searchQuery = searchParams.get('search') || '';
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '185');

  const [search, setSearch] = useState(searchQuery);
  const [price, setPrice] = useState([minPrice, maxPrice]);
  const { data, error, isLoading } = useApiData();
  console.log(error, isLoading);

  useEffect(() => {
    setCategories(data.categories);
    setProducts(data.products);
  }, [data.categories, data.products]);

  // Фетчим продукты напрямую с фильтрами
  useEffect(() => {
    const fetchProducts = async () => {
      // setIsLoading(true);
      // setError(null);

      try {
        // Формируем query параметры напрямую для вашего API
        const params = new URLSearchParams();
        // params.append('page', page.toString());
        // params.append('limit', '6');

        if (category_id) params.append('category_id', category_id);
        if (search) params.append('search', search);
        // if (hasDiscount) params.append('discount', 'true');
        // params.append('minPrice', debouncedPrice[0].toString());
        // params.append('maxPrice', debouncedPrice[1].toString());

        // ✅ ПРЯМОЙ запрос к вашему API!
        const response = await fetch(`${API_URL}/products?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: GetProductsResponse = await response.json();
        setProducts(data.products || []);
        // setTotalProducts(data.total || 0);
      } catch (error) {
        console.error('Error fetching products:', error);
        // setError('Failed to load products');
      } finally {
        // setIsLoading(false);
      }
    };

    fetchProducts();
  }, [search, category_id]);

  // Обновляем URL при изменении фильтров
  const updateURL = useCallback((newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // if (!newParams.page && params.get('page') !== '1') {
    //   params.set('page', '1');
    // }

    router.replace(`/catalog?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleCategoryChange = (value: string) => {
    console.log('Selected value:', value);
    updateURL({ category_id: value });
  }

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handlePriceChange = (newPrice: number[]) => {
    setPrice(newPrice);
  };

  // console.log(handlePriceChange);

  const categoriesSelect = useMemo(() => {
    const defaultOption = { value: "", label: "Категория" };
    const categoryOptions = categories.map(category => ({
      value: category.id.toString(),
      label: category.name
    }));

    return [defaultOption, ...categoryOptions];
  }, [categories]);

  return (
    <section className={styles.catalogPage}>
      <div className={styles.searchMobile}>
        <Searching />
      </div>

      <h1 className={cn("left", styles.catalogPage__title)}>Каталог товаров</h1>

      <div className={styles.catalog}>
        <div className={styles.catalog__filterMobile} onClick={() => setShowFilter(true)}>
          <Image src={'/filter-mobile.svg'} width={20} height={20} alt={''} />

          <span className={styles.filterMobileLabel}>Фильтры</span>
        </div>
        <div className={cn(styles.catalog__filter, {
          [styles.visible]: showFilter
        })} onClick={() => setShowFilter(false)}>
          <div className={styles.catalog__search}>
            <InputField onChange={(e) => handleSearchChange(e.target.value)} value={search} className={styles.catalog__input} variant="gray" name={"searching"} placeholder="Поиск..." />

            <Image src={'/search.svg'} width={20} height={20} alt={''} />
          </div>
          <SelectField options={categoriesSelect} value={category_id} onChange={handleCategoryChange} />
          <div className={styles.catalog__priceSearch}>
            <div className={styles.slider}>
              <input
                type="range"
                min="0"
                max="185"
                value={price[0]}
                onChange={(e) => handlePriceChange([parseInt(e.target.value), price[1]])}
                style={{ width: '100%', margin: '10px 0' }}
              />
              <input
                type="range"
                min="0"
                max="185"
                value={price[1]}
                onChange={(e) => handlePriceChange([price[0], parseInt(e.target.value)])}
                style={{ width: '100%', margin: '10px 0' }}
              />
            </div>
            <span>{`Цена: $${price[0]} - $${price[1]}`}</span>
          </div>
          <div className={styles.catalog__switch}>
            <span className={styles.catalog__switchLabel}>Со скидкой</span>
            {/* <Switch /> */}
          </div>
        </div>

        <div className={styles.catalog__cardsWrapper}>
          {isLoading && <div className={styles.loading}>Loading</div>}

          {!isLoading && products.length === 0 && (
            <div className={styles.noProducts}>
              Товары не найдены
            </div>
          )}

          <ul className={styles.catalog__cards}>
            {!isLoading && products.length !== 0 && products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
