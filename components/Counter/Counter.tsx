import Image from 'next/image';
import { CounterProps } from './Counter.interface';
import styles from './Counter.module.css';

export const Counter = ({ counter }: CounterProps) => {
  return (
    <div className={styles.counter}>
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
