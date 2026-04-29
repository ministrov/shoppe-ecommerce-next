import Image from 'next/image';
import { MockProductCardProps } from './MockProductCard.interface';
import styles from './MockProductCard.module.css';

/**
 * Компонент карточки товара для демонстрационных целей (мок-данные).
 * Отображает изображение товара, название и цену в виде списка.
 * Используется для заполнения каталога или демонстрации интерфейса при отсутствии реальных данных.
 *
 * @param {MockProductCardProps} props - Пропсы компонента
 * @param {Product} props.product - Объект товара, содержащий id, изображения, название и цену
 * @returns {JSX.Element} Элемент списка с карточкой товара
 *
 * @example
 * // Использование с мок-данными
 * <MockProductCard product={{
 *   id: 1,
 *   title: "Название товара",
 *   price: 99.99,
 *   images: ["/image.jpg"]
 * }} />
 */
export const MockProductCard = ({ product }: MockProductCardProps) => {
  return (
    <li className={styles.item} key={product.id}>
      <Image className={styles.image} src={product.images[0]} width={377} height={380} alt='Изображение товара в фокусе' />

      <p className={styles.title}>{product.title}</p>
      <p className={styles.price}>$ {product.price}</p>
    </li>
  )
}
