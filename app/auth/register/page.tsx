import Link from 'next/link';
import styles from './page.module.css';

export default function Register() {
  return (
    <div className={styles.register}>
      <h1>Мой аккаунт</h1>

      <div className={styles.tabs}>
        <Link href={'/auth/login'}>Войти</Link>
        <Link href={'/auth/register'}>Зарегистрироваться</Link>
      </div>
    </div>
  );
}
