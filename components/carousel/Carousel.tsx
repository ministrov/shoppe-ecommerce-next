import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { CarouselProps } from './Carousel.interface';
import styles from './Carousel.module.css';

export const Carousel = ({ images, autoPlayInterval = 5000 }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  console.log(currentSlide);

  // Функция для перехода к следующему слайду
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Функция для перехода к конкретному слайду
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Автоматическое переключение слайдов
  useEffect(() => {
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, images.length, nextSlide]);
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
            onClick={() => goToSlide(index)}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
