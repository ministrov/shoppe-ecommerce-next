'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { InputField } from '@/components/inputField/InputField';
import { FormMessageWithAnimation } from '@/components/formMessageWithAnimation/FormMessageWithAnimation';
import { useEmailValidation } from '@/hooks/useEmailValidation';
import { NewsletterSubscriptionProps } from './NewsletterSubscription.interface';
import cn from 'classnames';
import styles from './NewsletterSubscription.module.css';

/**
 * Компонент формы подписки на рассылку с валидацией email.
 * Включает поле ввода, кнопку отправки и отображение сообщений об ошибках/успехе.
 * Поддерживает кастомную логику отправки через проп onSubmit.
 *
 * @param {NewsletterSubscriptionProps} props - Пропсы компонента
 * @param {Function} [props.onSubmit] - Функция обратного вызова при отправке
 * @param {string} [props.initialEmail] - Начальное значение email
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {string} [props.inputId] - ID для поля ввода
 * @param {string} [props.inputPlaceholder] - Плейсхолдер для поля ввода
 * @param {string} [props.buttonAriaLabel] - ARIA-лейбл для кнопки
 * @param {Object} [props.customErrorMessages] - Кастомные сообщения об ошибках
 * @param {boolean} [props.showMessages=true] - Флаг отображения сообщений
 * @param {number} [props.successMessageDuration=3000] - Длительность успешного сообщения
 * @returns {JSX.Element} Форма подписки на рассылку
 *
 * @example
 * <NewsletterSubscription
 *   onSubmit={(email) => console.log('Subscribed:', email)}
 *   inputPlaceholder="Введите ваш email"
 * />
 */
export const NewsletterSubscription = ({
  onSubmit,
  initialEmail = '',
  className,
  inputId = 'newsletter-subscription-email',
  inputPlaceholder = 'Ваш email для акций и предложений',
  buttonAriaLabel = 'Подписаться на рассылку',
  customErrorMessages,
  showMessages = true,
  successMessageDuration = 3000,
}: NewsletterSubscriptionProps) => {
  const {
    email,
    setEmail,
    error,
    setError,
    validate,
    reset,
  } = useEmailValidation(initialEmail);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Кастомные сообщения об ошибках
  const errorMessages = {
    empty: customErrorMessages?.empty || 'Пожалуйста, введите email',
    invalid: customErrorMessages?.invalid || 'Пожалуйста, введите корректный email',
    submitError: customErrorMessages?.submitError || 'Произошла ошибка при подписке. Попробуйте позже.',
    success: customErrorMessages?.success || 'Вы успешно подписались на рассылку!',
  };

  // Сбрасываем ошибку отправки при изменении email
  useEffect(() => {
    if (submitError) {
      setSubmitError('');
    }
  }, [email, submitError]);

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Имитация отправки на сервер (заглушка)
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Успешная подписка
      setShowSuccessMessage(true);
      reset();

      // Скрываем успешное сообщение через заданное время
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, successMessageDuration);
    } catch {
      setSubmitError(errorMessages.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Обработчик изменения email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (error) setError(''); // Сбрасываем ошибку валидации при вводе
  };

  // Определяем, есть ли ошибка для отображения
  const hasError = !!error || !!submitError;
  const errorMessage = submitError || error;

  return (
    <div className={cn(styles.container, className)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="subscribe-heading"
      >
        <h3 id="subscribe-heading" className="visually-hidden">
          Подписка на рассылку
        </h3>
        <label htmlFor={inputId} className="visually-hidden">
          {inputPlaceholder}
        </label>
        <InputField
          id={inputId}
          className={styles.input}
          variant={hasError ? 'error' : 'black'}
          name="subscribe"
          placeholder={inputPlaceholder}
          aria-label={inputPlaceholder}
          value={email}
          onChange={handleEmailChange}
          type="email"
          required
          aria-required="true"
          autoComplete="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          title="Пожалуйста, введите корректный email адрес"
          disabled={isSubmitting}
        />
        <button
          className={styles.subscribeButton}
          type="submit"
          name="subscribe"
          aria-label={buttonAriaLabel}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className={styles.submitSpinner}></span>
          ) : (
            <Image src="/arrow-right.svg" width={20} height={20} alt="" />
          )}
        </button>
      </form>

      {showMessages && (
        <div className={styles.messagesContainer}>
          {/* Сообщение об ошибке */}
          <FormMessageWithAnimation
            message={errorMessage}
            isError={true}
            isVisible={!!errorMessage}
            animation={{
              initial: { x: 50, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              exit: { x: 50, opacity: 0 },
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          />

          {/* Сообщение об успехе */}
          <FormMessageWithAnimation
            message={errorMessages.success}
            isError={false}
            isVisible={showSuccessMessage}
            animation={{
              initial: { x: 20, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              exit: { x: 50, opacity: 0 },
              transition: { duration: 0.4 },
            }}
          />
        </div>
      )}
    </div>
  );
};