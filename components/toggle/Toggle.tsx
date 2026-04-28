import { ToggleProps } from './Toggle.interface';
import cn from 'classnames';
import styles from './Toggle.module.css';

/**
 * Компонент переключателя (toggle switch).
 * Визуально отображает состояние включено/выключено и реагирует на клики.
 *
 * @param {ToggleProps} props - Свойства компонента
 * @param {boolean} props.isChecked - Состояние переключателя (включен/выключен)
 * @param {function} props.onClick - Обработчик клика по переключателю
 * @returns {JSX.Element} Переключатель с анимированным ползунком
 *
 * @example
 * <Toggle isChecked={isOn} onClick={() => setIsOn(!isOn)} />
 */
export const Toggle = ({ isChecked, ...props }: ToggleProps) => {
  return (
    <div className={cn(styles.toggle, {
      [styles.toggled]: isChecked
    })} {...props}>
      <div className={styles.thumb}></div>
    </div>
  )
}
