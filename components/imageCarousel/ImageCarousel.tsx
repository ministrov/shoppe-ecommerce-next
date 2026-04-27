'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageCarouselProps } from './ImageCarousel.interface';
import styles from './ImageCarousel.module.css';

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  console.log(images);

  if (!images.length) {
    return <div className={styles.emptyState}>No images available</div>;
  }

  const mainImage = images[selectedImageIndex];

  // Ограничиваем отображение миниатюр до 4
  const displayedThumbnails = images.slice(0, 4);

  return (
    <div className={styles.carouselContainer}>
      {/* Основное большое изображение */}
      <div className={styles.mainImageWrapper}>
        <Image
          src={mainImage}
          alt={`Product image ${selectedImageIndex + 1}`}
          width={570}
          height={630}
          className={styles.mainImage}
          priority
          unoptimized={mainImage.startsWith('data:')}
        />
      </div>

      {/* Галерея превью (максимум 4 миниатюры) */}
      {displayedThumbnails.length > 0 && (
        <div className={styles.thumbnailGallery}>
          {displayedThumbnails.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === selectedImageIndex ? styles.active : ''
                }`}
              onClick={() => setSelectedImageIndex(index)}
              aria-label={`View image ${index + 1}`}
              type="button"
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
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
