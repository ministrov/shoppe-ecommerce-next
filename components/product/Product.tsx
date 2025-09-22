import { ProductProps } from './Product.interface';
import styles from './Product.module.css';

export const Product = ({ product }: ProductProps) => {
  return (
    <article className={styles.product}>
      <div className="card__img-container">

      </div>
      <div className="card__info-container card-info">
        <h1>Product Page</h1>
        <p>Product ID: {product?.product.id}</p>
      </div>
    </article>
  )
}
