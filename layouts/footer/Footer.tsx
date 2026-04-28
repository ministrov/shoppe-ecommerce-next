'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialsList } from '@/components/socialsList/SocialsList';
import { InputField } from '@/components/inputField/InputField';
import { Message } from '@/components/message/Message';
import styles from './Footer.module.css';

/**
 * Компонент подвала сайта.
 * Содержит навигационные ссылки, форму подписки на рассылку и социальные сети.
 * Реализует валидацию email и отображение сообщений об ошибках/успехе.
 *
 * @returns {JSX.Element} Подвал сайта
 */
export const Footer = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const emailFieldId = 'footer-subscribe-email';

  // Анимация выезда справа (как в login/page.tsx)
  const slideIn = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 }
  };

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setError('Пожалуйста, введите email');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Пожалуйста, введите корректный email');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    // Имитация отправки на сервер (заглушка)
    try {
      // Здесь должен быть реальный запрос к API подписки
      await new Promise(resolve => setTimeout(resolve, 800)); // имитация задержки
      setShowSuccessMessage(true);
      setEmail('');
      // Скрываем успешное сообщение через 3 секунды
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch {
      setError('Произошла ошибка при подписке. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footer__top}>
        <nav aria-label="Навигация по сайту">
          <h2 className="visually-hidden">Навигация по сайту</h2>
          <ul>
            <li>
              <Link href='#'>Контакты</Link>
            </li>
            <li>
              <Link href='#'>Условия покупки</Link>
            </li>
            <li>
              <Link href='#'>Доставка и возврат</Link>
            </li>
          </ul>
        </nav>
        <div>
          <form
            className={styles.footer__form}
            onSubmit={handleSubmit}
            noValidate
            aria-labelledby="subscribe-heading"
          >
            <h3 id="subscribe-heading" className="visually-hidden">
              Подписка на рассылку
            </h3>
            <label htmlFor={emailFieldId} className="visually-hidden">
              Ваш email для акций и предложений
            </label>
            <InputField
              id={emailFieldId}
              className={styles.footer__input}
              variant={error ? 'error' : 'black'}
              name='subscribe'
              placeholder='Ваш email для акций и предложений'
              aria-label="Ваш email для акций и предложений"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(''); // сбрасываем ошибку при вводе
              }}
              type="email"
              required
              aria-required="true"
              autoComplete="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              title="Пожалуйста, введите корректный email адрес"
            />
            <button
              className={styles.footer__subscribe}
              type='submit'
              name='subscribe'
              aria-label="Подписаться на рассылку"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.submitSpinner}></span>
              ) : (
                <Image src='/arrow-right.svg' width={20} height={20} alt='' />
              )}
            </button>
          </form>

          {/* Блок для отображения ошибки */}
          <div className={styles.errorContainer}>
            <AnimatePresence>
              {error && (
                <motion.div
                  className={styles.errorMessage}
                  {...slideIn}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  key="email-error"
                >
                  <Message text={error} isError />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Блок для отображения успешного сообщения */}
          <div className={styles.successContainer}>
            <AnimatePresence>
              {showSuccessMessage && (
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  key="success-message"
                >
                  <Message text="Вы успешно подписались на рассылку!" isError={false} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <div className={styles.footer__copyright}>© {new Date().getFullYear()} Shoppe</div>
        <div className={styles.footer__social}>
          <SocialsList />
        </div>
      </div>
    </footer>
  );
};
