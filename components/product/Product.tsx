import Image from 'next/image';
import { ProductProps } from './Product.interface';
import styles from './Product.module.css';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:3000';

export const Product = ({ product }: ProductProps) => {
  if (!product?.product) return <div>Product not available</div>;

  // Функция для создания полного URL изображения - всегда возвращает string
  const getFullImageUrl = (imagePath: string): string => {
    if (!imagePath) return '/images/placeholder.jpg'; // Заглушка вместо null

    // Если путь уже полный URL
    if (imagePath.startsWith('http')) return imagePath;

    // Если путь абсолютный (начинается с /)
    if (imagePath.startsWith('/')) {
      return `${IMAGE_BASE_URL}${imagePath}`;
    }

    // Если путь относительный
    return `${IMAGE_BASE_URL}/uploads/${imagePath}`;
  };

  const images = product.product.images?.map(getFullImageUrl) || [];

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
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.infoContainer}>
        <h1>{product.product.name}</h1>
        <p>Product ID: {product.product.id}</p>
      </div>
    </article>
  );
}
