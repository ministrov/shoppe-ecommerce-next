import { InputFieldProps } from './InputField.interface';
import cn from 'classnames';
import styles from './InputField.module.css';

export const InputField = ({ className, ...props }: InputFieldProps) => {
  return <input className={cn(styles.input, className)} {...props} />;
};
