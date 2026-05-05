import { useState, useCallback } from 'react';

/**
 * Хук для валидации email и управления состоянием поля ввода.
 * Предоставляет состояние email, ошибки, функции валидации и сброса.
 *
 * @param {string} [initialEmail=''] - Начальное значение email
 * @returns {Object} Объект с состоянием и методами для работы с email
 * @returns {string} email - Текущее значение email
 * @returns {Function} setEmail - Функция для обновления email
 * @returns {string} error - Текст ошибки валидации (пустая строка, если ошибок нет)
 * @returns {Function} setError - Функция для установки ошибки вручную
 * @returns {Function} validate - Функция для валидации текущего email
 * @returns {Function} reset - Функция для сброса email и ошибки
 *
 * @example
 * const { email, setEmail, error, validate, reset } = useEmailValidation();
 *
 * const handleSubmit = () => {
 *   if (validate()) {
 *     // email валиден
 *   }
 * };
 */
export const useEmailValidation = (initialEmail = '') => {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState('');

  /**
   * Валидирует email по формату и наличию значения.
   * @param {string} [emailToValidate=email] - Email для валидации (по умолчанию текущее значение)
   * @returns {boolean} true если email валиден, false если есть ошибки
   */
  const validate = useCallback((emailToValidate = email): boolean => {
    const trimmedEmail = emailToValidate.trim();

    if (!trimmedEmail) {
      setError('Пожалуйста, введите email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Пожалуйста, введите корректный email');
      return false;
    }

    setError('');
    return true;
  }, [email]);

  /**
   * Сбрасывает состояние email и ошибки к начальным значениям.
   */
  const reset = useCallback(() => {
    setEmail('');
    setError('');
  }, []);

  return {
    email,
    setEmail,
    error,
    setError,
    validate,
    reset,
  };
};