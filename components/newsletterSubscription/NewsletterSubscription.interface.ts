/**
 * Интерфейс для компонента NewsletterSubscription.
 * Определяет форму подписки на рассылку с валидацией email.
 */
export interface NewsletterSubscriptionProps {
  /**
   * Функция обратного вызова при успешной отправке формы.
   * Принимает email в качестве аргумента.
   * Если не передана, используется имитация отправки.
   */
  onSubmit?: (email: string) => Promise<void> | void;
  /**
   * Начальное значение email поля.
   */
  initialEmail?: string;
  /**
   * Дополнительные CSS-классы для контейнера формы.
   */
  className?: string;
  /**
   * ID для поля ввода email.
   * Если не передан, будет сгенерирован автоматически.
   */
  inputId?: string;
  /**
   * Плейсхолдер для поля ввода email.
   * По умолчанию: "Ваш email для акций и предложений"
   */
  inputPlaceholder?: string;
  /**
   * ARIA-лейбл для кнопки отправки.
   * По умолчанию: "Подписаться на рассылку"
   */
  buttonAriaLabel?: string;
  /**
   * Текст ошибки при невалидном email (кастомный).
   * Если не передан, используются стандартные сообщения.
   */
  customErrorMessages?: {
    empty?: string;
    invalid?: string;
    submitError?: string;
    success?: string;
  };
  /**
   * Флаг отображения сообщений об ошибках/успехе.
   * По умолчанию: true
   */
  showMessages?: boolean;
  /**
   * Длительность отображения успешного сообщения в миллисекундах.
   * По умолчанию: 3000
   */
  successMessageDuration?: number;
}