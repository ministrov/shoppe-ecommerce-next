'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProductCardProps } from './ProductCard.interface';
import { AddFavorite } from '../addFavorite/AddFavorite';
import styles from './ProductCard.module.css';

/**
 * Карточка товара для отображения в каталоге.
 * Отображает изображение, название, цену, скидку и кнопку добавления в избранное.
 * При наведении показывает кнопку избранного.
 * Рассчитывает итоговую цену с учётом скидки.
 *
 * @param props - Пропсы компонента
 * @param props.product - Данные товара
 * @returns React-элемент карточки товара
 *
 * @example
 * <ProductCard product={product} />
 */
export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const firstImage = product.images[0] || '';

  // Определяем, является ли изображение data URL
  const isDataUrl = firstImage.startsWith('data:');
  let imageUrl = '';

  if (isDataUrl) {
    imageUrl = firstImage;
  } else if (baseUrl) {
    imageUrl = `${baseUrl}${firstImage}`;
  } else {
    imageUrl = firstImage;
  }

  const imageStyle = { backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' };

  const sale = useMemo(() => (product.price * product.discount) / 100, [product.price, product.discount]);
  const priceWithDiscount = useMemo(() => Math.round(product.price - sale), [product.price, sale]);

  return (
    <li className={styles.item}>
      <Link
        className={styles.card}
        href={`/catalog/${product.id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.image} style={imageStyle}>
          {product.discount > 0 ? <span className={styles.discount}>-{product.discount}%</span> : <span></span>}
          <AddFavorite productId={product.id} isShown={isHovered} />
        </div>
        <div className={styles.footer}>
          <div className={styles.name}>
            {product.name}
          </div>
          <div className={styles.price}>
            {product.discount > 0 && <span className={styles.priceDiscount}>$ {product.price}</span>}
            $ {priceWithDiscount}
          </div>
        </div>
      </Link>
    </li>
  )
}
