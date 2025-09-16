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
    <main className={styles.register}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form method="post" action="" className={styles.form}>
        <fieldset className={styles.fieldset}>
          <legend className="visually-hidden">Данные для регистрации</legend>

          <div className={styles.fields}>
            <InputField
              type="email"
              variant="gray"
              placeholder="Email"
              name="email"
              id="email"
              required
              aria-required="true"
              autoComplete="email"
            />
            <InputField
              type="password"
              variant="gray"
              placeholder="Пароль"
              name="password"
              id="password"
              required
              aria-required="true"
              autoComplete="new-password"
              minLength={8}
            />
            <InputField
              type="password"
              variant="gray"
              placeholder="Повторите пароль"
              name="confirmPassword"
              id="confirmPassword"
              required
              aria-required="true"
              autoComplete="new-password"
            />
          </div>
        </fieldset>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            required
            aria-required="true"
            className={styles.checkbox}
          />
          <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
            Согласен на обработку персональных данных
          </label>
        </div>

        <Button color="primary" type='submit'>
          Зарегистрироваться
        </Button>

        <Link href={'/'} className={styles.forgotPassword}>Забыли пароль?</Link>
      </form>
    </main>
  );
}
