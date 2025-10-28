import Image from 'next/image';
import { MockProductCardProps } from './MockProductCard.interface';
import styles from './MockProductCard.module.css';

export const MockProductCard = ({ product }: MockProductCardProps) => {
  return (
    <li className={styles.item} key={product.id}>
      <Image className={styles.image} src={product.images[0]} width={377} height={380} alt='Изображение товара в фокусе' />

      <p className={styles.title}>{product.title}</p>
      <p className={styles.price}>$ {product.price}</p>
    </li>
  )
}
