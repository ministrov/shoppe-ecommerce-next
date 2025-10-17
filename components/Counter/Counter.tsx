import Image from 'next/image';
import cn from 'classnames';
import { CounterProps } from './Counter.interface';

import styles from './Counter.module.css';

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
