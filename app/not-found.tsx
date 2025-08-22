import Link from 'next/link';
import { Button } from '@/components/button/Button';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.error__wrapper}>
      <h1>404 ошибка</h1>

      <p className={styles.error__message}>Страница не найдена, попробуйте перейти на главную страницу</p>

      <Button ghost size='small'>
        <Link href={'/'}>Главная страница</Link>
      </Button>
    </div>
  );
}
