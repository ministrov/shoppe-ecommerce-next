import { ButtonProps } from './Button.props';
import cn from 'classnames';
import styles from './Button.module.css';

const Button = ({ children, size }: ButtonProps) => {
  // console.log(appearence, children, size);
  return (
  <button
    className={cn(styles.button, {
      [styles.medium]: size === 'medium',
      [styles.small]: size === 'small',
    })}
    >
      {children}
    </button>
  );
};

export default Button;
