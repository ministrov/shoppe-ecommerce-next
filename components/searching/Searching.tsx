import Image from 'next/image';
import styles from './Searching.module.css';

export const Searching = () => {
  return (
    <form className={styles.search}>
      <Image src={'/search.svg'} width={12} height={12} alt={'Icon search'} />
      <input className={styles.input} type="text" />
    </form>
  )
}
