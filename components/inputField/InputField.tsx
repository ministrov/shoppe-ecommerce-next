import { InputFieldProps } from './InputField.interface';
import cn from 'classnames';
import styles from './InputField.module.css';

export const InputField = ({ className, variant = 'black', ...props }: InputFieldProps) => {
  return <input className={cn(styles.input, className, {
    [styles.gray]: variant === 'gray'
  })} {...props} />;
};
