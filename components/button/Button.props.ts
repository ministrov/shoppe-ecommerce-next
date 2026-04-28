import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Пропсы компонента Button.
 */
export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Призрачный стиль (прозрачный фон) */
  ghost?: boolean;
  /** Размер кнопки */
  size?: 'medium' | 'small';
  /** Содержимое кнопки (текст или React-элементы) */
  children: ReactNode;
}
