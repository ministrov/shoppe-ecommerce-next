import cn from 'classnames';
import styles from './InputField.module.css';

export const InputField = ({ className, ...props }: { className: string }) => {
  return <input {...props} className={cn(styles.input, className)} />;
};
