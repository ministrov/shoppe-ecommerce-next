'use client';

import { useState } from 'react';
import { AddFavorite } from '../addFavorite/AddFavorite';
import { Button } from '../button/Button';
import { ImageCarousel } from '../imageCarousel/ImageCarousel';
import { SocialsList } from '../socialsList/SocialsList';
import { ProductProps } from './Product.interface';
import { Counter } from '../counter/Counter';
import { ProductTabs } from '../productTabs/ProductTabs';
import Rating from '../rating/Rating';
import { declineReviewWord } from '@/helpers';
import { useCart } from '@/hooks/useCart';
import styles from './Product.module.css';

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || 'http://localhost:3000';

/**
 * Основной компонент страницы товара, отображающий детальную информацию о продукте.
 * Включает карусель изображений, название, цену, рейтинг, описание, кнопки добавления в корзину,
 * избранное, социальные кнопки и вкладки с подробным описанием и отзывами.
 *
 * @param {ProductProps} props - Пропсы компонента
 * @param {ProductWithReviews} props.product - Объект товара с дополнительной информацией (продукт, отзывы)
 * @returns {JSX.Element} Разметка страницы товара или сообщение об отсутствии товара
 *
 * @example
 * // Использование на странице товара
 * <Product product={productData} />
 */
export const Product = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product?.product) return <div>Product not available</div>;

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleAddToCart = () => {
    addItem({ product: product.product, quantity });
  };

  /**
   * Вспомогательная функция для преобразования пути изображения в полный URL.
   * Обрабатывает различные форматы путей: data URL, абсолютные URL, абсолютные пути и относительные пути.
   *
   * @param {string} imagePath - Путь к изображению (может быть data URL, полным URL, абсолютным или относительным путём)
   * @returns {string} Полный URL изображения или путь к заглушке, если передан пустой путь
   *
   * @example
   * // Возвращает 'http://localhost:3000/uploads/image.jpg'
   * getFullImageUrl('image.jpg')
   *
   * @example
   * // Возвращает 'http://localhost:3000/images/placeholder.jpg'
   * getFullImageUrl('')
   */
  const getFullImageUrl = (imagePath: string): string => {
    if (!imagePath) return '/images/placeholder.jpg'; // Заглушка вместо null

    // Если это data URL (встроенное изображение)
    if (imagePath.startsWith('data:')) return imagePath;

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

        <ImageCarousel images={images} />

        <div className={styles.infoContainer}>
          <h1 className={styles.infoTitle}>{product.product.name}</h1>
          <p className={styles.price}>$ {product.product.price}</p>

          <div className={styles.rating}>
            <Rating rating={0} isEditable />
            <div className={styles.reviewsCount}>
              <span>{product.reviews.length}</span>
              <span>{declineReviewWord(product.reviews.length)}</span>
            </div>
          </div>
          <p className={styles.shortDescr}>{product.product.short_description}</p>

          <div className={styles.addToCart}>
            <Counter
              counter={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              className={''}
            />

            <Button className={styles.addToCartBtn} ghost onClick={handleAddToCart}>
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

        <ProductTabs description={product.product.long_description} reviews={product.reviews} />
      </section>
    </article>
  );
}
