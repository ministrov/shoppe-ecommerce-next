'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import { Tabs } from '@/components/tabs/Tabs';
import { loginUser } from '@/store/authThunk/authThunk';
import { tabs } from '@/interfaces/tabs.interface';
import styles from './page.module.css';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert(
        "Заполните все поля для входа в систему. Пожалуйста, проверьте введенные данные и повторите попытку."
      );
      return;
    }

    try {
      // Используем thunk для логина
      const result = await dispatch(loginUser({ email, password }));

      // Проверяем результат thunk-действия
      if (loginUser.fulfilled.match(result)) {
        // Успешный вход - перенаправляем
        // router.push('/orders');
        router.push('/');
        console.log("Успешный вход:", result.payload);
      }
      // В случае ошибки она автоматически установится в state.auth.error
      // через extraReducers в slice

    } catch (error) {
      console.error("Неожиданная ошибка:", error);
      alert("Произошла непредвиденная ошибка");
    }

    console.log(e.currentTarget);
  };

  return (
    <main className={styles.login}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form
        onSubmit={handleLogin}
        className={styles.form}
        aria-labelledby="form-heading"
      >
        <h2 id="form-heading" className="visually-hidden">
          Форма регистрации
        </h2>

        <fieldset className={styles.fieldset}>
          <legend className="visually-hidden">Данные для регистрации</legend>

          <div className={styles.fields}>
            <InputField
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="gray"
              name="email"
              id="email"
              placeholder="Email"
              required
              aria-required="true"
              autoComplete="email"
            />
            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="gray"
              name="password"
              id="password"
              placeholder="Пароль"
              required
              aria-required="true"
              autoComplete="new-password"
              minLength={8}
            />

            {error && (
              <div className={styles.error}>
                {error}
              </div>
            )}
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
          {isLoading ? 'Вход...' : 'Вход'}
        </Button>

        <Link className={styles.forgotPassword} href={'/'}>Забыли пароль?</Link>
      </form>
    </main>
  );
}
