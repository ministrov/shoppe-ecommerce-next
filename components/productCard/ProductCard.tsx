import { useMemo } from 'react';
import Link from 'next/link';
import { ProductCardProps } from './ProductCard.interface';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product }: ProductCardProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  const imageUrl = baseUrl ? `${baseUrl}${product.images[0]}` : '';
  const imageStyle = { backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' };

  const sale = useMemo(() => (product.price * product.discount) / 100, [product.price, product.discount]);
  const priceWithDiscount = useMemo(() => Math.round(product.price - sale), [product.price, sale]);

  return (
    <li className={styles.item}>
      <Link className={styles.card} href={`/catalog/${product.id}`}>
        <div className={styles.image} style={imageStyle}>
          {product.discount > 0 ? <span className={styles.discount}>-{product.discount}%</span> : <span></span>}
          {/* <AddFavorite :id="product.id" :is-shown="isHovered" /> */}
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
