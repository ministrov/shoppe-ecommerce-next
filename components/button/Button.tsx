import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

/**
 * Универсальная кнопка с поддержкой различных размеров и стилей.
 *
 * @param props - Пропсы компонента
 * @param props.children - Содержимое кнопки
 * @param props.size - Размер кнопки ('medium' | 'small')
 * @param props.className - Дополнительные CSS-классы
 * @param props.ghost - Призрачный стиль (прозрачный фон)
 * @param props.rest - Стандартные атрибуты HTML-кнопки
 * @returns React-элемент кнопки
 *
 * @example
 * <Button size="medium" ghost onClick={() => console.log('click')}>
 *   Нажми меня
 * </Button>
 */
export const Button = ({ children, size, className, ghost = false, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles['button--ghost']]: ghost,
        [styles['button--medium']]: size === 'medium',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
