'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageCarouselProps } from './ImageCarousel.interface';
import { enhanceWithMockImages } from '@/mocks/imageCarousel.mock';
import styles from './ImageCarousel.module.css';

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Enhance images with mock images in development mode if we have less than 2 images
  const enhancedImages = enhanceWithMockImages(images, 2);

  if (!enhancedImages.length) {
    return <div className={styles.emptyState}>No images available</div>;
  }

  const mainImage = enhancedImages[selectedImageIndex];

  // Limit thumbnails to 4 for display
  const displayedThumbnails = enhancedImages.slice(0, 4);

  return (
    <div className={styles.carouselContainer}>
      {/* Main large image */}
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

      {/* Thumbnail gallery (max 4 thumbnails) */}
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
