'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import { Tabs } from '@/components/tabs/Tabs';
import { Message } from '@/components/message/Message';
import { loginUser } from '@/store/authThunk/authThunk';
import { tabs } from '@/interfaces/tabs.interface';
import styles from './page.module.css';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  // Анимация выезда справа
  const slideIn = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validate = () => {
      const newErrors: { email?: string, password?: string } = {};
      if (!email) newErrors.email = 'Пожалуйста, введите email';
      if (!password) newErrors.password = 'Пожалуйста, введите пароль';
      else if (password.length < 8) newErrors.password = 'Пароль должен быть не короче 8 символов';
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    try {
      if (!validate()) return;
      // Используем thunk для логина
      const result = await dispatch(loginUser({ email, password }));

      // Проверяем результат thunk-действия
      if (loginUser.fulfilled.match(result)) {
        setShowSuccessMessage(true);
        setErrors({});
        setEmail('');
        setPassword('');

        // Сначала ждем 2 сек для показа сообщения
        setTimeout(() => {
          setShowSuccessMessage(false); // Запуск exit анимации

          // Ждем еще 400 мс на проигрывание exit анимации
          setTimeout(() => {
            router.push('/');
            console.log("Успешный вход:", result.payload);
          }, 400);	// должно совпадать с duration exit анимации!
        }, 3000);
      }
    } catch (error) {
      console.error("Неожиданная ошибка:", error);
    }
  };

  return (
    <section className={styles.login}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form
        onSubmit={handleLogin}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant={errors.email ? 'error' : 'gray'}
              name="email"
              id="email"
              placeholder="Email"
              required
              aria-required="true"
              autoComplete="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" // ← Валидация email
              title="Пожалуйста, введите корректный email адрес"
            />

            <AnimatePresence>
              {errors.email && (
                <motion.div
                  className={styles.errorMessage}
                  {...slideIn}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  key="email-error"
                >
                  <Message content={errors.email} isError />
                </motion.div>
              )}
            </AnimatePresence>

            <InputField
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant={errors.email ? 'error' : 'gray'}
              name="password"
              id="password"
              placeholder="Пароль"
              required
              aria-required="true"
              autoComplete="new-password"
              minLength={8}
              inputMode="numeric" // ← Цифровая клавиатура на мобильных
              title="Пароль должен содержать только цифры"
            />

            <AnimatePresence>
              {errors.password && (
                <motion.div
                  className={styles.errorMessage}
                  {...slideIn}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  key="password-error"
                >
                  <Message content={errors.password} isError />
                </motion.div>
              )}
            </AnimatePresence>

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
          <label htmlFor="rememberMe" className={styles.checkboxLabel}>
            Запомнить меня
          </label>
        </div>

        <Button color="primary" type='submit' className={styles.enterBtn}>
          {isLoading ? 'Вход...' : 'Вход'}
        </Button>

        <Link className={styles.forgotPassword} href={'/auth/restore'}>Забыли пароль?</Link>
      </form>

      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            key="success-message"
          >
            <Message content="Вы успешно вошли в систему!" isError={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
