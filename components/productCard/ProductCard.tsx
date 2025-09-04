import Link from 'next/link';
import { ProductCardProps } from './ProductCard.interface';
import styles from './ProductCard.module.css';

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <li className={styles.catalog__item}>
      <Link className={styles.card} href={''}>
        <div className={styles.card__image}>
          <span v-if="product.discount > 0" className={styles.card__discount}
          >-{product.discount}%</span>
          <span v-else></span>
          {/* <AddFavorite :id="product.id" :is-shown="isHovered" /> */}
        </div>
        <div className="card__footer">
          <div className="card__name">
            {product.name}
          </div>
          <div className="card__price">
            <span v-if="product.discount" className="card__price-discount">$ {product.price}</span>
            {/* $ {priceWithDiscount} */}
          </div>
        </div>
      </Link>
    </li>
  )
}
