'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InputField } from '@/components/inputField/InputField';
import { Button } from '@/components/button/Button';
import { Tabs } from '@/components/tabs/Tabs';
import { Message } from '@/components/message/Message';
import { tabs } from '@/interfaces/tabs.interface';
import styles from './page.module.css';

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<{
    email?: string,
    password?: string,
    confirmPassword?: string,
    agreeTerms?: string
  }>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Анимация выезда справа (как в login)
  const slideIn = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const validate = () => {
      const newErrors: {
        email?: string,
        password?: string,
        confirmPassword?: string,
        agreeTerms?: string
      } = {};

      if (!email) newErrors.email = 'Пожалуйста, введите email';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Пожалуйста, введите корректный email адрес';
      }

      if (!password) newErrors.password = 'Пожалуйста, введите пароль';
      else if (password.length < 8) newErrors.password = 'Пароль должен быть не короче 8 символов';

      if (!confirmPassword) newErrors.confirmPassword = 'Пожалуйста, повторите пароль';
      else if (password !== confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';

      const agreeTermsCheckbox = document.getElementById('agreeTerms') as HTMLInputElement;
      if (!agreeTermsCheckbox?.checked) {
        newErrors.agreeTerms = 'Необходимо согласие на обработку персональных данных';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    try {
      if (!validate()) {
        setIsLoading(false);
        return;
      }

      // TODO: Заменить на реальный API запрос регистрации
      console.log('Форма валидна, можно отправлять данные', { email, password });

      // Имитация успешной регистрации
      setShowSuccessMessage(true);
      setErrors({});
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      // Сначала ждем 2 сек для показа сообщения
      setTimeout(() => {
        setShowSuccessMessage(false); // Запуск exit анимации

        // Ждем еще 400 мс на проигрывание exit анимации
        setTimeout(() => {
          router.push('/');
          console.log("Успешная регистрация");
        }, 400);
      }, 3000);

    } catch (error) {
      console.error("Неожиданная ошибка:", error);
      setErrors({ confirmPassword: 'Ошибка при регистрации. Попробуйте позже.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.register}>
      <h1>Мой аккаунт</h1>

      <Tabs tabs={tabs} pathname={pathname} />

      <form
        onSubmit={handleSubmit}
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
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              variant={errors.password ? 'error' : 'gray'}
              placeholder="Пароль"
              name="password"
              id="password"
              required
              aria-required="true"
              autoComplete="new-password"
              minLength={8}
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

            <InputField
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant={errors.confirmPassword ? 'error' : 'gray'}
              placeholder="Повторите пароль"
              name="confirmPassword"
              id="confirmPassword"
              required
              aria-required="true"
              autoComplete="new-password"
              inputMode="numeric"
              title="Пароль должен содержать только цифры"
            />

            <AnimatePresence>
              {errors.confirmPassword && (
                <motion.div
                  className={styles.errorMessage}
                  {...slideIn}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  key="confirmPassword-error"
                >
                  <Message content={errors.confirmPassword} isError />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </fieldset>

        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            required
            aria-required="true"
            className={`${styles.checkbox} ${errors.agreeTerms ? styles.checkboxError : ''}`}
            onChange={() => setErrors(prev => ({ ...prev, agreeTerms: undefined }))}
          />
          <label htmlFor="agreeTerms" className={styles.checkboxLabel}>
            Согласен на обработку персональных данных
          </label>

          <AnimatePresence>
            {errors.agreeTerms && (
              <motion.div
                className={styles.errorMessage}
                {...slideIn}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                key="agreeTerms-error"
              >
                <Message content={errors.agreeTerms} isError />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          color="primary"
          type='submit'
          className={styles.registerBtn}
          disabled={isLoading}
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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
            <Message content="Регистрация успешна! Вы будете перенаправлены на главную страницу." isError={false} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
