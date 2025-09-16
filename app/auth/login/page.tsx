'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { InputField } from '@/components/inputField/InputField';
import styles from './page.module.css';
import { Button } from '@/components/button/Button';

export default function Login() {
  const pathname = usePathname();

  const tabs = [
    { href: '/auth/login', label: 'Войти' },
    { href: '/auth/register', label: 'Зарегистрироваться' },
  ];
  return (
    <div className={styles.login}>
      <h1>Мой аккаунт</h1>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <span
            key={tab.href}
            className={`${styles.tabsItem} ${pathname === tab.href ? styles.active : ''
              }`}
          >
            <Link href={tab.href}>{tab.label}</Link>
          </span>
        ))}
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

        <label htmlFor="rememberMe">
          <input type="checkbox" id="rememberMe" />
          Запомнить меня
        </label>

        <Button color="primary">
          Вход
        </Button>

        <Link href={'/'}>Забыли пароль?</Link>
      </form>
    </div>
  );
}
