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
 * @returns {JSX.Element} Счетчик с кнопками управления
 *
 * @example
 * // Базовое использование
 * <Counter counter={5} />
 *
 * @example
 * // С дополнительным классом для стилизации
 * <Counter counter={3} className="my-counter" />
 */
export const Counter = ({ counter, className }: CounterProps) => {
  return (
    <div className={cn(styles.counter, className)}>
      <button>
        <Image src={'/minus.svg'} width={10} height={27} alt={''} />
      </button>
      {counter}
      <button>
        <Image src={'/plus.svg'} width={10} height={27} alt={''} />
      </button>
    </div>
  )
}
