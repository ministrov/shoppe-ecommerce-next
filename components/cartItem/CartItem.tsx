import Image from 'next/image';
import { Counter } from '../Counter/Counter';
import { CartItemProps } from './CartItem.interface';
import styles from './CartItem.module.css';

export const CartItem = ({ title, image, price, quantity }: CartItemProps) => {
  return (
    <article
      className={styles.item}
      role="article"
      aria-label={`Товар: ${title}`}
      tabIndex={0}
    >
      <Image src={image} width={80} height={80} alt={''} />

      <div className={styles.textInfo}>
        <h3>{title}</h3>
        <p>{price}</p>
      </div>

      <Counter counter={quantity} />
    </article>
  )
}
