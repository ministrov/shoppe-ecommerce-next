import Link from 'next/link';
import { Searching } from '@/components/searching/Searching';
import styles from './page.module.css';

export default function Home() {
  return (
    <section>
      <div className={styles.searchMobile}>
        <Searching />
      </div>
      <div className={styles.carousel}>Carousel</div>

      <section className={styles.newIncome}>
        <header>
          <h2>Последние поступления</h2>

          <Link href={'/catalog'} >Все</Link>
        </header>
      </section>
    </section>
  );
}
