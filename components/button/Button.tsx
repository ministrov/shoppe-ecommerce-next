import { ButtonProps } from './Button.props';
import styles from './Button.module.css';

const Button = ({ appearence, children, size}: ButtonProps) => {
  console.log(appearence, children, size);
  return (
    <button className={styles.button}>{children}</button>
  );
};

export default Button;