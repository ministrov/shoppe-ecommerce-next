import Image from 'next/image';
import styles from './ProductCounter.module.css';

export const ProductCounter = () => {
  return (
    <div className={styles.counter}>
      <button>
        <Image src={'/minus.svg'} width={10} height={27} alt={''} />
      </button>
      {1}
      <button>
        <Image src={'/plus.svg'} width={10} height={27} alt={''} />
      </button>
    </div>
  )
}
