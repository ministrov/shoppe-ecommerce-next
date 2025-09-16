'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { Button } from '@/components/button/Button';
import { InputField } from '@/components/inputField/InputField';

export default function Register() {
  const pathname = usePathname();
  const tabs = [
    { href: '/auth/login', label: 'Войти' },
    { href: '/auth/register', label: 'Зарегистрироваться' },
  ];

  return (
    <div className={styles.register}>
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
      </form>
    </div>
  );
}
