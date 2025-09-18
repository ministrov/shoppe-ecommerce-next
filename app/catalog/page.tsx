'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { InputField } from '@/components/inputField/InputField';
import { Searching } from '@/components/searching/Searching';
import { SelectField } from '@/components/selectField/SelectField';
import { ProductCard } from '@/components/productCard/ProductCard';
import { RangeSlider } from '@/components/rangeSlider/RangeSlider';
import { Pagination } from '@/components/pagination/Pagination';
// import { ProtectedRoute } from '@/components/protectedRoute/ProtectedRoute';
// import { useAppSelector } from '@/store/hooks';
import { Category } from '@/interfaces/category.interface';
import { Product, GetProductsResponse } from '@/interfaces/product.interface';
import { API_URL } from '@/helpers';
import { useApiData } from '@/hooks/useApiData';
import { useDebounce } from '@/hooks/useDebounce';
import { fetchCategories } from '@/api/categories';
import cn from 'classnames';
import styles from './page.module.css';

export default function Catalog() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isChangingPage, setIsChangingPage] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const isInitialLoadRef = useRef(true);

  // Получаем параметры из URL
  const category_id = searchParams.get('category_id') || '';
  const searchQuery = searchParams.get('search') || '';
  const has_discount = searchParams.get('has_discount') === 'true';
  const page = parseInt(searchParams.get('page') || '1');
  const minPrice = parseInt(searchParams.get('price_from') || '0');
  const maxPrice = parseInt(searchParams.get('price_to') || '1200');

  const [search, setSearch] = useState(searchQuery);
  const [price, setPrice] = useState<[number, number]>([minPrice, maxPrice]);
  const [hasDiscount, setHasDiscount] = useState<boolean>(has_discount);
  const { error, isLoading } = useApiData();

  const debouncedSearch = useDebounce<string>(search, 500);
  const debouncedPrice = useDebounce<[number, number]>(price, 500);

  const ITEMS_PER_PAGE = 6;

  // Сохраняем позицию скролла перед изменением страницы
  const saveScrollPosition = useCallback(() => {
    scrollPositionRef.current = window.scrollY;
  }, []);

  // Функция для восстановления позиции скролла ← ТЕПЕРЬ ИСПОЛЬЗУЕМ
  const restoreScrollPosition = useCallback(() => {
    if (scrollPositionRef.current > 0 && !isInitialLoadRef.current) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'auto' });
    }
  }, []);

  // Получаем категории через ваш модуль
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        if (categoriesData) {
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    getCategories();
  }, []);

  // Фетчим продукты напрямую с фильтрами
  useEffect(() => {
    const fetchProducts = async () => {
      if (debouncedSearch.length < 2 && debouncedSearch !== '') {
        return; // Не делаем запрос при слишком коротком поиске
      }

      try {
        // Формируем query параметры напрямую для вашего API
        const params = new URLSearchParams();

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

        setAllProducts(data.products || []);
        setTotalProducts(data.total || 0);

        // ВОССТАНАВЛИВАЕМ СКРОЛЛ ПОСЛЕ ЗАГРУЗКИ ДАННЫХ
        if (!isInitialLoadRef.current) {
          restoreScrollPosition();
        }

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [category_id, hasDiscount, debouncedSearch, debouncedPrice, restoreScrollPosition]);

  // Пагинация на клиентской стороне
  useEffect(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentPageProducts = allProducts.slice(startIndex, endIndex);

    setPaginatedProducts(currentPageProducts);

    if (isChangingPage) {
      const handleScroll = () => {
        if (catalogRef.current) {
          catalogRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }

        setIsChangingPage(false);
      };

      setTimeout(handleScroll, 100);
    }

    // СБРАСЫВАЕМ ФЛАГ ПЕРВОЙ ЗАГРУЗКИ ПОСЛЕ МОНТИРОВАНИЯ
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
    }

  }, [allProducts, page, isChangingPage]);

  // Обновляем URL при изменении фильтров
  const updateURL = useCallback((newParams: Record<string, string>) => {
    saveScrollPosition(); // Сохраняем скролл перед навигацией

    const params = new URLSearchParams(searchParams.toString());

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (!newParams.page) {
      params.set('page', '1');
    }

    router.replace(`/catalog?${params.toString()}`, { scroll: false });
  }, [router, searchParams, saveScrollPosition]);

  const handleCategoryChange = (value: string) => {
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
    updateURL({ has_discount: newDiscount.toString() });
  };

  const handlePageChange = (newPage: number) => {
    setIsChangingPage(true);
    updateURL({ page: newPage.toString() });
  };

  const categoriesSelect = useMemo(() => {
    const defaultOption = { value: "", label: "Категория" };
    const categoryOptions = categories.map(category => ({
      value: category.id.toString(),
      label: category.name
    }));

    return [defaultOption, ...categoryOptions];
  }, [categories]);

  return (
    <section className={styles.catalogPage} ref={catalogRef}>
      <h1 className='visually-hidden'>Страница каталога товаров с фильтрами</h1>

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

          <RangeSlider min={0} max={1200} value={price} onChange={handlePriceChange} />

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

          {!isLoading && paginatedProducts.length === 0 && (
            <div className={styles.noProducts}>
              Товары не найдены
            </div>
          )}

          <ul className={styles.catalog__cards}>
            {!isLoading && paginatedProducts.length !== 0 && paginatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>

          {totalProducts > ITEMS_PER_PAGE && (
            <Pagination page={page} total={totalProducts} limit={6} onClick={handlePageChange} />
          )}
        </div>
      </div>
    </section>
  );
};
