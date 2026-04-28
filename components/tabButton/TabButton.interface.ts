/**
 * Свойства компонента кнопки вкладки (таба).
 */
export interface TabButtonProps {
  /** Текст кнопки */
  label: string;
  /** Флаг активности вкладки */
  isActive: boolean;
  /** Опциональное количество (например, количество отзывов) */
  count?: number;
  /** Обработчик клика по кнопке */
  onClick: () => void;
  /** Идентификатор для анимации активного индикатора (layoutId Framer Motion) */
  layoutId: string;
}
