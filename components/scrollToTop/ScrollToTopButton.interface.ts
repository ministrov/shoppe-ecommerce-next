import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

/**
 * Пропсы компонента ScrollToTopButton.
 * Компонент отображает кнопку для возврата к началу страницы.
 * Кнопка появляется только когда пользователь проскролил страницу на указанное расстояние.
 *
 * @property {number} [threshold=540] - Порог в пикселях, после которого кнопка становится видимой.
 *                                      По умолчанию 540px (как указано в требованиях).
 * @property {string} [className] - Дополнительные CSS-классы для кастомизации.
 * @property {ReactNode} [icon] - Кастомная иконка для кнопки. Если не указана, используется стандартная стрелка.
 * @property {string} [ariaLabel='Вернуться к началу страницы'] - Текст для accessibility (ARIA).
 * @property {number} [scrollDuration=500] - Длительность анимации скролла в миллисекундах.
 * @property {'smooth' | 'auto'} [scrollBehavior='smooth'] - Поведение скролла.
 */
export interface ScrollToTopButtonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  /** Порог в пикселях для отображения кнопки */
  threshold?: number;
  /** Дополнительные CSS-классы */
  className?: string;
  /** Кастомная иконка */
  icon?: ReactNode;
  /** Текст для accessibility (ARIA) */
  ariaLabel?: string;
  /** Длительность анимации скролла в миллисекундах */
  scrollDuration?: number;
  /** Поведение скролла */
  scrollBehavior?: 'smooth' | 'auto';
}

/**
 * Возвращаемое значение хука useScrollToTop.
 *
 * @property {boolean} isVisible - Флаг видимости кнопки (true, если скролл превысил порог).
 * @property {() => void} scrollToTop - Функция для плавного скролла к началу страницы.
 * @property {number} currentScrollY - Текущая позиция скролла в пикселях.
 */
export interface UseScrollToTopReturn {
  /** Флаг видимости кнопки */
  isVisible: boolean;
  /** Функция для плавного скролла к началу страницы */
  scrollToTop: () => void;
  /** Текущая позиция скролла в пикселях */
  currentScrollY: number;
}