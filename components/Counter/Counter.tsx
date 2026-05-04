import Image from 'next/image';
import cn from 'classnames';
import { CounterProps } from './Counter.interface';

import styles from './Counter.module.css';

/**
 * Компонент счетчика с кнопками увеличения и уменьшения значения.
 * Отображает текущее значение между кнопками "минус" и "плюс".
 * Используется для управления количеством товаров в корзине или других числовых значений.
 *
 * @param {CounterProps} props - Свойства компонента
 * @param {number} props.counter - Текущее значение счетчика
 * @param {string} [props.className] - Дополнительные CSS-классы для контейнера
 * @param {Function} [props.onDecrement] - Обработчик уменьшения значения
 * @param {Function} [props.onIncrement] - Обработчик увеличения значения
 * @returns {JSX.Element} Счетчик с кнопками управления
 *
 * @example
 * // Базовое использование
 * <Counter counter={5} onIncrement={() => {}} onDecrement={() => {}} />
 *
 * @example
 * // С дополнительным классом для стилизации
 * <Counter counter={3} className="my-counter" />
 */
export const Counter = ({ counter, className, onDecrement, onIncrement }: CounterProps) => {
  return (
    <div className={cn(styles.counter, className)}>
      <button
        type="button"
        onClick={onDecrement}
        aria-label="Уменьшить количество"
        disabled={counter <= 1}
      >
        <Image src={'/minus.svg'} width={10} height={27} alt={''} />
      </button>
      {counter}
      <button
        type="button"
        onClick={onIncrement}
        aria-label="Увеличить количество"
      >
        <Image src={'/plus.svg'} width={10} height={27} alt={''} />
      </button>
    </div>
  )
}
