'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import { Tabs } from '@/components/tabs/Tabs';
import { tabs } from '@/interfaces/tabs.interface';
import styles from './page.module.css';
// import { style } from 'framer-motion/client';

export default function Login() {
  const pathname = usePathname();

  return (
    <main className={styles.login}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form
        method="post"
        action=""
        className={styles.form}
        aria-labelledby="form-heading"
        noValidate
      >
        <h2 id="form-heading" className="visually-hidden">
          Форма регистрации
        </h2>

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
          </div>
        </fieldset>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            required
            aria-required="true"
            className={styles.checkbox}
          />
          <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
            Запомнить меня
          </label>
        </div>

        <Button color="primary" type='submit' className={styles.enterBtn}>
          Вход
        </Button>

        <Link href={'/'} className={styles.forgotPassword}>Забыли пароль?</Link>
      </form>
    </main>
  );
}
