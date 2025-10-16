import { CartItemProps } from './CartItem.interface';
import styles from './CartItem.module.css';

export const CartItem = ({ id, title, image, description, price, quantity }: CartItemProps) => {
  return (
    <article
      className={styles.item}
      role="article"
      aria-label={`Товар: ${title}`}
      tabIndex={0}
    >
      {id}
      {image}
      {description}
      {price}
      {quantity}
      {/* {console.log(() => onRemove())} */}
      {/* {onChangeQuantity} */}
    </article>
  )
}
