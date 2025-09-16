'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import { Tabs } from '@/components/tabs/Tabs';
import { tabs } from '@/interfaces/tabs.interface';
import styles from './page.module.css';

export default function Login() {
  const pathname = usePathname();

  return (
    <div className={styles.login}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form method="post" action="" className={styles.form}>
        <div className={styles.fiels}>
          <InputField variant="gray" placeholder="Email" />
          <InputField
            type="password"
            variant="gray"
            placeholder="Пароль"
          // autoComplete="off"
          />
        </div>

        <label htmlFor="rememberMe">
          <input type="checkbox" id="rememberMe" />
          Запомнить меня
        </label>

        <Button color="primary">
          Вход
        </Button>

        <Link href={'/'} className={styles.forgotPassword}>Забыли пароль?</Link>
      </form>
    </div>
  );
}
