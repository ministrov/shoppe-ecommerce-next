import { ToggleProps } from './Toggle.interface';
import cn from 'classnames';
import styles from './Toggle.module.css';

export const Toggle = ({ isChecked }: ToggleProps) => {
  return (
    <div className={cn(styles.toggle, {
      [styles.toggled]: isChecked
    })}>
      <div className={styles.thumb}></div>
    </div>
  )
}
