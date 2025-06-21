import Image from 'next/image';
import styles from './Searching.module.css';

export const Searching = ({ ...props}) => {
  return (
    <form className={styles.search} {...props}>
      <Image className={styles.searchIcon} src={'/search-2.svg'} width={12} height={12} alt={'Icon search'} />
      <input
        className={styles.searchInput}
        type='text'
        name='search'
        placeholder='Поиск'
      />
    </form>
  );
}
