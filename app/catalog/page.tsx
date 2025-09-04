'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { InputField } from '@/components/inputField/InputField';
import { Searching } from '@/components/searching/Searching';
import { SelectField } from '@/components/selectField/SelectField';
import { Category, GetCategoryResponse } from '@/interfaces/category.interface';
import cn from 'classnames';
import styles from './page.module.css';
// import { label } from 'framer-motion/client';

// const options = [
//   { label: 'Option 1', value: '1' },
//   { label: 'Option 2', value: '2' },
//   { label: 'Option 3', value: '3' },
// ];

const API_URL = 'http://localhost:3000/api';

export default function Catalog() {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL + '/categories');
        const data: GetCategoryResponse = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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

  console.log(categoriesSelect);
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

          </ul>
        </div>
      </div>
    </section>
  );
};