'use client';

import { useState } from 'react';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import styles from './page.module.css';

export default function Restore() {
  const [email, setEmail] = useState<string>('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;

    // Проверяем валидность формы средствами HTML5
    if (!form.checkValidity()) {
      // Показываем браузерные сообщения об ошибке
      form.reportValidity();
      return;
    }

    console.log('Email valid:', email);
    // Здесь ваш API запрос
  };

  return (
    <section className={styles.restore}>
      <h1>Забыли пароль?</h1>

      <p>
        Если вы забыли пароль, то введите свой email и мы отправим вам ссылку на восстановление
      </p>

      <form
        onSubmit={handleLogin}
        className={styles.form}
        aria-labelledby="form-heading"
        noValidate
      >
        <h2 id="form-heading" className="visually-hidden">
          Форма для сброса пароля
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
              autoComplete="email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // ← Простая валидация email
              title="Пожалуйста, введите корректный email адрес"
            />
          </div>
        </fieldset>

        <Button color="primary" type='submit' className={styles.restoreBtn}>
          Сбросить пароль
        </Button>
      </form>
    </section>
  );
}
