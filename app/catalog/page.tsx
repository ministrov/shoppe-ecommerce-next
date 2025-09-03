'use client';

import Image from 'next/image';
import { InputField } from '@/components/inputField/InputField';
import { Searching } from '@/components/searching/Searching';
import { SelectField } from '@/components/selectField/SelectField';
import cn from 'classnames';
import styles from './page.module.css';

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export default function Catalog() {
  const handleSelectChange = (value: string) => {
    console.log('Selected value:', value)
  }
  return (
    <section className={styles.catalogPage}>
      <div className={styles.searchMobile}>
        <Searching />
      </div>

      <h1 className={cn("left", styles.catalogPage__title)}>Каталог товаров</h1>

      <div className={styles.catalog}>
        <div className={styles.catalog__filter}>
          <div className={styles.catalog__search}>
            <InputField className={styles.catalog__input} variant="gray" name={"searching"} placeholder="Поиск..." />

            <Image src={'/search.svg'} width={20} height={20} alt={''} />
          </div>
          <SelectField options={options} onChange={handleSelectChange} />
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