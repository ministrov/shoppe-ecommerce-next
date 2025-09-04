'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { InputField } from '@/components/inputField/InputField';
import { Searching } from '@/components/searching/Searching';
import { SelectField } from '@/components/selectField/SelectField';
import { ProductCard } from '@/components/productCard/ProductCard';
import { Category } from '@/interfaces/category.interface';
import { Product } from '@/interfaces/product.interface';
import { useApiData } from '@/hooks/useApiData';
import cn from 'classnames';
import styles from './page.module.css';

export default function Catalog() {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { data, error, isLoading } = useApiData();
  console.log(error, isLoading);

  useEffect(() => {
    setCategories(data.categories);
    setProducts(data.products);
  }, [data.categories, data.products]);

  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value)
  }

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
            <InputField className={styles.catalog__input} variant="gray" name={"searching"} placeholder="Поиск..." />

            <Image src={'/search.svg'} width={20} height={20} alt={''} />
          </div>
          <SelectField options={categoriesSelect} onChange={handleSelectChange} />
          <div className={styles.catalog__priceSearch}>
            slider

            <span>{`Цена: $40 - $180`}</span>
          </div>
          <div className={styles.catalog__switch}>
            <span className={styles.catalog__switchLabel}>Со скидкой</span>
            {/* <USwitch size="xl" color="neutral" value="false" /> */}
          </div>
        </div>

        <div className={styles.catalog__cardsWrapper}>
          <ul className={styles.catalog__cards}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
