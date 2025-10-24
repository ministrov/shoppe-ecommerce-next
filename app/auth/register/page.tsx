'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import { Tabs } from '@/components/tabs/Tabs';
import { tabs } from '@/interfaces/tabs.interface';
import styles from './page.module.css';

export default function Register() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const pathname = usePathname();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    // Проверяем валидность формы средствами HTML5
    if (!form.checkValidity()) {
      form.reportValidity(); // Показывает браузерные сообщения
      return;
    }

    // Дополнительная проверка совпадения паролей
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    console.log('Форма валидна, можно отправлять данные');
    // Здесь ваш API запрос на регистрацию
  };

  return (
    <section className={styles.register}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form
        onSubmit={handleSubmit}
        className={styles.form}
        noValidate
      >
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
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // ← Валидация email
              title="Пожалуйста, введите корректный email адрес" // ← Сообщение об ошибке
            />
            <InputField
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="gray"
              placeholder="Повторите пароль"
              name="confirmPassword"
              id="confirmPassword"
              required
              aria-required="true"
              autoComplete="new-password"
              // pattern="[0-9]*"
              inputMode="numeric" // ← Цифровая клавиатура на мобильных
              title="Пароль должен содержать только цифры"
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

        <Button color="primary" type='submit' className={styles.registerBtn}>
          Зарегистрироваться
        </Button>

        <Link className={styles.forgotPassword} href={'/auth/restore'} >Забыли пароль?</Link>
      </form>
    </section>
  );
}
