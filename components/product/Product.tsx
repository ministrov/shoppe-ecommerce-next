import Image from 'next/image';
import { ProductProps } from './Product.interface';
import styles from './Product.module.css';

export const Product = ({ product }: ProductProps) => {
  // const { product } = product;
  return (
    <article className={styles.product}>
      <div className={styles.imgContainer}>
        <ul className="img-carousel">
          <li className="img-carousel__item active">
            {product?.product.images[0] && (
              <Image src={product?.product.images[0]} alt="" width="570" height="630" />
            )}
          </li>
          <li className="img-carousel__item">
            {product?.product.images[1] && (
              <Image src={product?.product.images[1]} alt="" width="170" height="160" />
            )}
          </li>
          <li className="img-carousel__item">
            {product?.product.images[2] && (
              <Image src={product?.product.images[2]} alt="" width="170" height="160" />
            )}
          </li>
          <li className="img-carousel__item">
            {product?.product.images[3] && (
              <Image src={product?.product.images[3]} alt="" width="170" height="160" />
            )}
          </li>
        </ul>
      </div>
      <div className={styles.infoContainer}>
        <h1>Product Page</h1>
        <p>Product ID: {product?.product.id}</p>
      </div>
    </article>
  )
}
