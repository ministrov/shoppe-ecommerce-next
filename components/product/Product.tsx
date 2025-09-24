'use client';

import { AddFavorite } from '../addFavorite/AddFavorite';
import { Button } from '../button/Button';
import { StarIcon } from '../starIcon/StarIcon';
import { ImageCarousel } from '../imageCarousel/ImageCarousel';
import { SocialsList } from '../socialsList/SocialsList';
import { ProductProps } from './Product.interface';
import { ProductCounter } from '../productCounter/ProductCounter';
import { ProductTabs } from '../productTabs/ProductTabs';
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
      <div className={styles.wrapper}>
        <div className={styles.imgContainer}>
          <ImageCarousel images={images} />
        </div>
        <div className={styles.infoContainer}>
          <h1 className={styles.infoTitle}>{product.product.name}</h1>
          <p className={styles.price}>$ {product.product.price}</p>

          <div className={styles.rating}>
            <div className={styles.ratingContainer}>
              <StarIcon isEditable={false} />
              <StarIcon isEditable={false} />
              <StarIcon isEditable={false} />
              <StarIcon isEditable={false} />
              <StarIcon isEditable={false} />
            </div>

            <div className={styles.reviewsCount}>
              <span>{product.reviews.length}</span>
              <span>отзыва</span>
            </div>
          </div>
          <p className={styles.shortDescr}>{product.product.short_description}</p>

          <div className={styles.addToCart}>
            <ProductCounter />

            <Button className={styles.addToCartBtn} ghost>
              Добавить в корзину
            </Button>
          </div>

          <div className={styles.whishlist}>
            <AddFavorite productId={product.product.id} isShown={true} />

            <SocialsList />
          </div>

          <div className={styles.skuBlock}>
            <p className={styles.sku}>
              SKU:
              <span>{product.product.sku}</span>
            </p>
            <p className={styles.categoryName}>
              Категория:
              <span>{product.product?.category.name}</span>
            </p>
          </div>
        </div>
      </div>

      <section className={styles.description}>
        <h2 className='visually-hidden'>Секция описаний и ревью</h2>

        <ProductTabs />
      </section>
    </article>
  );
}
