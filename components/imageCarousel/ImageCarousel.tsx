'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageCarouselProps } from './ImageCarousel.interface';
import { enhanceWithMockImages } from '@/mocks/imageCarousel.mock';
import styles from './ImageCarousel.module.css';

/**
 * Компонент карусели изображений для товаров.
 * Отображает основное большое изображение и до 4 миниатюр для навигации.
 * Поддерживает мок-изображения в режиме разработки, если реальных изображений недостаточно.
 * Позволяет выбирать изображение кликом по миниатюре.
 *
 * @param {ImageCarouselProps} props - Свойства компонента
 * @param {string[]} props.images - Массив URL изображений товара
 * @param {string} [props.productName] - Название товара для генерации описательных alt-текстов
 * @returns {JSX.Element} Карусель изображений с основным изображением и миниатюрами
 *
 * @example
 * // Базовое использование
 * <ImageCarousel images={['/img1.jpg', '/img2.jpg']} />
 *
 * @example
 * // С описательными alt-текстами
 * <ImageCarousel images={['/img1.jpg']} productName="Смартфон X" />
 */
export const ImageCarousel = ({ images, productName }: ImageCarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Enhance images with mock images in development mode if we have less than 2 images
  const enhancedImages = enhanceWithMockImages(images, 2);

  if (!enhancedImages.length) {
    return <div className={styles.emptyState}>No images available</div>;
  }

  const mainImage = enhancedImages[selectedImageIndex];

  // Limit thumbnails to 4 for display
  const displayedThumbnails = enhancedImages.slice(0, 4);

  // Генерация описательных alt-текстов
  const getAltText = (index: number, isThumbnail: boolean = false) => {
    if (productName) {
      return isThumbnail
        ? `Миниатюра ${index + 1} товара "${productName}"`
        : `Изображение ${index + 1} товара "${productName}"`;
    }
    // Обратная совместимость: общие alt-тексты
    return isThumbnail
      ? `Thumbnail ${index + 1}`
      : `Product image ${index + 1}`;
  };

  return (
    <div className={styles.carouselContainer}>
      {/* Main large image */}
      <div className={styles.mainImageWrapper}>
        <Image
          src={mainImage}
          alt={getAltText(selectedImageIndex, false)}
          width={570}
          height={630}
          className={styles.mainImage}
          priority
          unoptimized={mainImage.startsWith('data:')}
        />
      </div>

      {/* Thumbnail gallery (max 4 thumbnails) */}
      {displayedThumbnails.length > 0 && (
        <div className={styles.thumbnailGallery}>
          {displayedThumbnails.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.active : ''
                }`}
              onClick={() => setSelectedImageIndex(index)}
              aria-label={productName ? `Просмотр изображения ${index + 1} товара "${productName}"` : `View image ${index + 1}`}
              type="button"
            >
              <Image
                src={image}
                alt={getAltText(index, true)}
                width={120}
                height={120}
                className={styles.thumbnailImage}
                unoptimized={image.startsWith('data:')}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
