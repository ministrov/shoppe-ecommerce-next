import Image from 'next/image';
import { Counter } from '../counter/Counter';
import { CartItemProps } from './CartItem.interface';
import styles from './CartItem.module.css';

/**
 * Компонент элемента корзины покупок.
 * Отображает товар в корзине с изображением, названием, ценой, количеством и кнопкой удаления.
 * Использует компонент Counter для управления количеством товара.
 * Имеет доступную разметку с ARIA-атрибутами.
 *
 * @param {CartItemProps} props - Свойства компонента
 * @param {string} props.id - Уникальный идентификатор элемента корзины
 * @param {string} props.title - Название товара
 * @param {string} props.image - URL изображения товара
 * @param {string} props.price - Цена товара (форматированная строка)
 * @param {number} props.quantity - Количество товара в корзине
 * @param {Function} [props.onRemove] - Обработчик удаления товара из корзины
 * @param {Function} [props.onChangeQuantity] - Обработчик изменения количества товара
 * @returns {JSX.Element} Элемент товара в корзине
 *
 * @example
 * <CartItem
 *   id="123"
 *   title="Футболка"
 *   image="/tshirt.jpg"
 *   price="$29.99"
 *   quantity={2}
 *   onRemove={(id) => console.log('Remove', id)}
 *   onChangeQuantity={(id, quantity) => console.log('Change', id, quantity)}
 * />
 */
export const CartItem = ({
  id,
  title,
  image,
  price,
  quantity,
  onRemove,
  onChangeQuantity,
}: CartItemProps) => {
  const handleDecrement = () => {
    if (onChangeQuantity && quantity > 1) {
      onChangeQuantity(id, quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (onChangeQuantity) {
      onChangeQuantity(id, quantity + 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

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

        <Counter
          className={styles.cartCounter}
          counter={quantity}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
      </div>

      <button
        type="button"
        onClick={handleRemove}
        aria-label={`Удалить ${title} из корзины`}
        className={styles.cartItemRemove}
      >
        <Image src={'/close.svg'} width={14} height={14} alt={''} />
      </button>
    </article>
  )
}
