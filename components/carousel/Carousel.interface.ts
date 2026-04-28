import { CarouselImage } from '@/interfaces/carousel.interface';

/**
 * Свойства компонента карусели изображений.
 */
export interface CarouselProps {
  /** Массив изображений для отображения в карусели */
  images: CarouselImage[];
  /** Интервал автоматического переключения слайдов в миллисекундах (по умолчанию 5000) */
  autoPlayInterval?: number;
}
