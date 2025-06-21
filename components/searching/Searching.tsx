import Image from 'next/image';
import styles from './Searching.module.css';

export const Searching = ({ ...props}) => {
  return (
    <form className={styles.search} {...props}>
      <Image className={styles.iconSearch} src={'/search2.svg'} width={12} height={12} alt={'Icon search'} />
      <input className={styles.input} type='text' name='search' placeholder={'Поиск'} />
    </form>
  );
}
