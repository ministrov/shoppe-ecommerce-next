import Link from 'next/link';
import { InputField } from '@/components/inputField/InputField';
import styles from './page.module.css';
import { Button } from '@/components/button/Button';

export default function Login() {
  return (
    <div className={styles.login}>
      <h1>Мой аккаунт</h1>

      <div className={styles.tabs}>
        <Link href={'/auth/login'}>Войти</Link>
        <Link href={'/auth/register'}>Зарегистрироваться</Link>
      </div>

      <form method="post" action="" className={styles.form}>
        <div className={styles.fiels}>
          <InputField variant="gray" placeholder="Email" />
          <InputField
            type="password"
            variant="gray"
            placeholder="Пароль"
          />
        </div>

        <Button color="primary">
          Вход
        </Button>
      </form>
    </div>
  );
}
