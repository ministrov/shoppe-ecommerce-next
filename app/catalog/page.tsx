'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { InputField } from '@/components/inputField/InputField';
import { Searching } from '@/components/searching/Searching';
import { SelectField } from '@/components/selectField/SelectField';
import { ProductCard } from '@/components/productCard/ProductCard';
import { RangeSlider } from '@/components/rangeSlider/RangeSlider';
import { Category } from '@/interfaces/category.interface';
import { Product, GetProductsResponse } from '@/interfaces/product.interface';
import { API_URL } from '@/helpers';
import { useApiData } from '@/hooks/useApiData';
import { useDebounce } from '@/hooks/useDebounce';
import cn from 'classnames';
import styles from './page.module.css';

export default function Catalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(8);

  // Получаем параметры из URL
  const category_id = searchParams.get('category_id') || '';
  const searchQuery = searchParams.get('search') || '';
  const has_discount = searchParams.get('has_discount') === 'true';
  const page = parseInt(searchParams.get('page') || '1');
  const minPrice = parseInt(searchParams.get('price_from') || '0');
  const maxPrice = parseInt(searchParams.get('price_to') || '185');

  const [search, setSearch] = useState(searchQuery);
  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice]);
  const [hasDiscount, setHasDiscount] = useState<boolean>(has_discount);
  const { data, error, isLoading } = useApiData();

  const debouncedSearch = useDebounce<string>(search, 500);
  const debouncedPrice = useDebounce<[number, number]>(price, 500);

  useEffect(() => {
    setCategories(data.categories);
    setProducts(data.products);
  }, [data.categories, data.products]);

  // Фетчим продукты напрямую с фильтрами
  useEffect(() => {
    const fetchProducts = async () => {
      if (debouncedSearch.length < 2 && debouncedSearch !== '') {
        return; // Не делаем запрос при слишком коротком поиске
      }

      try {
        // Формируем query параметры напрямую для вашего API
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', '6');

        if (category_id) params.append('category_id', category_id);
        if (debouncedSearch) params.append('search', debouncedSearch);
        if (hasDiscount) params.append('has_discount', 'true');
        params.append('price_from', debouncedPrice[0].toString());
        params.append('price_to', debouncedPrice[1].toString());

        // ПРЯМОЙ запрос к вашему API!
        const response = await fetch(`${API_URL}/products?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data: GetProductsResponse = await response.json();
        setProducts(data.products || []);
        console.log(totalProducts);
        setTotalProducts(data.total || 0);
      } catch (error) {
        console.error('Error fetching products:', error);
        // setError('Failed to load products');
      } finally {
        // setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category_id, has_discount, hasDiscount, debouncedSearch, debouncedPrice, page, totalProducts]);

  // Обновляем URL при изменении фильтров
  const updateURL = useCallback((newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    console.log(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (!newParams.page && params.get('page') !== '1') {
      params.set('page', '1');
    }

    router.replace(`/catalog?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  const handleCategoryChange = (value: string) => {
    console.log('Selected value:', value);
    updateURL({ category_id: value });
  }

  const handleSearchChange = (value: string) => {
    setSearch(value);
    updateURL({ search: value });
  };

  const handlePriceChange = (newPrice: [number, number]) => {
    setPrice(newPrice);
    updateURL({
      price_from: newPrice[0].toString(),
      price_to: newPrice[1].toString()
    });
  };

  const handleDiscountChange = () => {
    const newDiscount = !hasDiscount;
    setHasDiscount(newDiscount);
    updateURL({ discount: newDiscount.toString() });
  };

  const handlePageChange = (newPage: number) => {
    updateURL({ page: newPage.toString() });
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
      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

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

          <RangeSlider min={0} max={185} value={price} onChange={handlePriceChange} />

          <div className={styles.catalog__switch}>
            <span className={styles.catalog__switchLabel}>Со скидкой</span>
            <input
              type="checkbox"
              checked={hasDiscount}
              onChange={handleDiscountChange}
              style={{ width: 40, height: 20 }}
            />
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

          {/* Пагинация - добавьте ваш компонент */}
          {totalProducts > 6 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                style={{ margin: '0 10px', padding: '10px 20px' }}
              >
                Назад
              </button>
              <span style={{ margin: '0 10px', padding: '10px' }}>Страница {page}</span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={products.length < 6}
                style={{ margin: '0 10px', padding: '10px 20px' }}
              >
                Вперед
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
