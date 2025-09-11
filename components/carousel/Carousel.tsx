import Image from 'next/image';
import { useState, useEffect } from 'react';
import { CarouselProps } from './Carousel.interface';
import styles from './Carousel.module.css';

export const Carousel = ({ images, autoPlayInterval = 5000 }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  console.log(images, autoPlayInterval);
  console.log(currentSlide, setCurrentSlide);

  useEffect(() => { }, []);
  return (
    <div className={styles.carousel}>
      <div className={styles.slidesContainer}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          >
            <Image
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image.alt}
              className={styles.image}
            />
          </div>
        ))}
      </div>

      {/* Буллеты */}
      <div className={styles.bullets}>
        {images.map((_, index) => (
          <button
            key={index}
            className={`${styles.bullet} ${index === currentSlide ? styles.active : ''}`}
            // onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
