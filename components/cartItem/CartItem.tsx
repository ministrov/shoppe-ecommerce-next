import Image from 'next/image';
import { Counter } from '../counter/Counter';
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
      <div className={styles.imageWrapper}>
        <Image className={styles.image} src={image} width={136} height={136} alt={''} />
      </div>

      <div className={styles.textInfoWrapper}>
        <div className={styles.textInfo}>
          <h3>{title}</h3>
          <p>{price}</p>
        </div>

        <Counter className={styles.cartCounter} counter={quantity} />
      </div>

      <button
        type="button"
        // onClick={() => onRemove(id)}
        aria-label={`Удалить ${title} из корзины`}
        className={styles.cartItemRemove}
      >
        <Image src={'/close.svg'} width={14} height={14} alt={''} />
      </button>
    </article>
  )
}
