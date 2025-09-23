import Image from 'next/image';
import { ProductProps } from './Product.interface';
import styles from './Product.module.css';

export const Product = ({ product }: ProductProps) => {
  const images = product?.product.images || [];
  console.log('Product images:', product?.product?.images);
  // const { product } = product;
  return (
    <article className={styles.product}>
      <div className={styles.imgContainer}>
        <ul className="img-carousel">
          {images.map((image, index) => (
            <li
              key={index}
              className={`img-carousel__item ${index === 0 ? 'active' : ''}`}
            >
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                width={index === 0 ? 570 : 170}
                height={index === 0 ? 630 : 160}
              // onError={(e) => {
              //   console.error(`Failed to load image: ${image}`);
              //   e.currentTarget.style.display = 'none';
              // }}
              />
            </li>
          ))}

          {images.length === 0 && (
            <li className="img-carousel__item active">
              <div style={{
                width: 570,
                height: 630,
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span>No images available</span>
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className={styles.infoContainer}>
        <h1>Product Page</h1>
        <p>Product ID: {product?.product.id}</p>
      </div>
    </article>
  )
}
