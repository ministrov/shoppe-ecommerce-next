'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import { tabs } from '@/interfaces/tabs.interface';
import styles from './page.module.css';
import { Tabs } from '@/components/tabs/Tabs';

export default function Register() {
  const pathname = usePathname();

  return (
    <div className={styles.register}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form method="post" action="" className={styles.form}>
        <div className={styles.fiels}>
          <InputField variant="gray" placeholder="Email" />
          <InputField
            type="password"
            variant="gray"
            placeholder="Пароль"
          />
          <InputField
            type="password"
            variant="gray"
            placeholder="Повторите пароль"
          />
        </div>

        <label htmlFor="rememberMe">
          <input type="checkbox" id="rememberMe" />
          Согласен на обработку персональных данных
        </label>

        <Button color="primary">
          Зарегистрироваться
        </Button>

        <Link href={'/'} className={styles.forgotPassword}>Забыли пароль?</Link>
      </form>
    </div>
  );
}
