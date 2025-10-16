import Image from 'next/image';
import { CartItemProps } from './CartItem.interface';
import styles from './CartItem.module.css';

export const CartItem = ({ id, title, image, price, quantity }: CartItemProps) => {
  return (
    <article
      className={styles.item}
      role="article"
      aria-label={`Товар: ${title}`}
      tabIndex={0}
    >
      {id}
      <Image src={image} width={80} height={80} alt={''} />
      {/* {description} */}
      {price}
      {quantity}
    </article>
  )
}
