/* eslint-disable @next/next/no-img-element */
import styles from './Searching.module.css';

export const Searching = () => {
  return (
    <form className={styles.search}>
      <img className={styles.searchIcon} width={12} height={12} src='/search-icon-2.svg' alt='Search' />
      <input className={styles.searchInput} type='text' name='search' placeholder='Поиск' />
    </form>
  );
}
