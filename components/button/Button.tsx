import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

export const Button = ({ children, size, className, ghost = false }: ButtonProps) => {
  return (
  <button
    className={cn(styles.button, className, {
      [styles['button--ghost']]: ghost,
      [styles['button--medium']]: size === 'medium',
      [styles['button--small']]: size === 'small',
    })}
    >
      {children}
    </button>
  );
};
