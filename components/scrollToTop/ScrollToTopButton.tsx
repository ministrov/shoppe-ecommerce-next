'use client';

import { useScrollToTop } from '@/hooks/useScrollToTop';
import { ScrollToTopButtonProps } from './ScrollToTopButton.interface';
import cn from 'classnames';
import styles from './ScrollToTopButton.module.css';

/**
 * Компонент кнопки для возврата к началу страницы.
 * Появляется когда пользователь проскролил страницу на указанное расстояние (по умолчанию 540px).
 * Предоставляет плавный скролл к началу страницы при клике.
 *
 * Компонент реализует:
 * - Отслеживание позиции скролла через кастомный хук
 * - Плавные анимации появления/исчезновения
 * - Доступность (ARIA атрибуты, клавиатурная навигация)
 * - Адаптивный дизайн для разных устройств
 * - Поддержка кастомных иконок и стилей
 *
 * @param {ScrollToTopButtonProps} props - Свойства компонента
 * @param {number} [props.threshold=540] - Порог в пикселях для отображения кнопки
 * @param {string} [props.className] - Дополнительные CSS-классы
 * @param {ReactNode} [props.icon] - Кастомная иконка
 * @param {string} [props.ariaLabel='Вернуться к началу страницы'] - Текст для accessibility
 * @param {number} [props.scrollDuration=500] - Длительность анимации скролла
 * @param {'smooth' | 'auto'} [props.scrollBehavior='smooth'] - Поведение скролла
 * @param {...HTMLAttributes<HTMLButtonElement>} props - Стандартные атрибуты кнопки
 * @returns {JSX.Element | null} Компонент кнопки или null если кнопка не видима
 *
 * @example
 * // Базовое использование с порогом 540px
 * <ScrollToTopButton />
 *
 * @example
 * // С кастомным порогом
 * <ScrollToTopButton threshold={300} />
 *
 * @example
 * // С кастомной иконкой и стилями
 * <ScrollToTopButton
 *   threshold={400}
 *   className="my-custom-class"
 *   icon={<MyCustomIcon />}
 *   ariaLabel="Scroll to top"
 * />
 */
export const ScrollToTopButton = ({
  threshold = 540,
  className,
  icon,
  ariaLabel = 'Вернуться к началу страницы',
  scrollDuration = 500,
  scrollBehavior = 'smooth',
  ...props
}: ScrollToTopButtonProps) => {
  const { isVisible, scrollToTop } = useScrollToTop(threshold, scrollDuration, scrollBehavior);

  // Если кнопка не видима и не находится в состоянии анимации, не рендерим её
  if (!isVisible) {
    return null;
  }

  /**
   * Обработчик клика по кнопке.
   * Вызывает функцию плавного скролла и предотвращает стандартное поведение.
   */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    scrollToTop();
  };

  /**
   * Обработчик нажатия клавиши (для accessibility).
   * Поддерживает клавиши Enter и Space.
   */
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToTop();
    }
  };

  // Стандартная иконка стрелки вверх (SVG)
  const defaultIcon = (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );

  return (
    <button
      className={cn(
        styles.button,
        isVisible ? styles.visible : styles.hidden,
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={ariaLabel}
      title={ariaLabel}
      type="button"
      {...props}
    >
      {icon || defaultIcon}
    </button>
  );
};