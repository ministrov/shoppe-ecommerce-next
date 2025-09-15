import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { CarouselProps } from './Carousel.interface';
import styles from './Carousel.module.css';

export const Carousel = ({ images, autoPlayInterval = 5000 }: CarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Функция для перехода к следующему слайду
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Функция для перехода к конкретному слайду
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => { }, []);

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
            <picture>
              <source media="(max-width: 375px)" srcSet={image.mobileSrc} />
              <Image
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                className={styles.image}
              />
            </picture>

            <div className={styles.text}>
              <p className={styles.title}>Gold big hoops</p>
              <span className={styles.price}>$ 68,00</span>

              <Link className={styles.link} href={'/catalog'}>Смотреть</Link>
            </div>
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
