import { InputField } from '@/components/inputField/InputField';
import cn from 'classnames';
import styles from './page.module.css';

export default function Catalog() {
  return (
    <section className={styles.catalogPage}>
      <div className={styles.searchMobile}>
        {/* <SearchForm /> */}
        SearchForm in here
      </div>

      <h1 className={cn("left", styles.catalogPage__title)}>Каталог товаров</h1>

      <div className={styles.catalog}>
        <div className={styles.catalog__filter}>
          <div className={styles.catalog__search}>
            <InputField className={styles.catalog__input} variant="gray" name={"searching"} placeholder="Поиск..." />

            Icon of search
          </div>

          <div className={styles.catalog__priceSearch}>
            {/* <USlider v-model="price" color="neutral" size="lg" /> */}

            {/* <span>{{ `Цена: $${price[0]} - $${price[1]}` }}</span> */}
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