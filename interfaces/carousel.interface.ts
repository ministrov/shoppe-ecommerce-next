/**
 * Изображение для карусели с поддержкой адаптивности.
 */
export interface CarouselImage {
  /** URL изображения для десктопной версии */
  src: string;
  /** URL изображения для мобильной версии */
  mobileSrc: string;
  /** Альтернативный текст для доступности */
  alt: string;
  /** Ширина изображения в пикселях */
  width: number;
  /** Высота изображения в пикселях */
  height: number;
}

/**
 * Массив изображений для карусели на главной странице.
 */
export const carouselImages: CarouselImage[] = [
  {
    src: '/home-img-1.jpg',
    mobileSrc: '/home-img-1-mobile.jpg',
    alt: 'Image 1',
    width: 1248,
    height: 646,
  },
  {
    src: '/home-img-2.jpg',
    mobileSrc: '/home-img-1-mobile.jpg',
    alt: 'Image 2',
    width: 1248,
    height: 646,
  },
  {
    src: '/home-img-1.jpg',
    mobileSrc: '/home-img-1-mobile.jpg',
    alt: 'Image 3',
    width: 1248,
    height: 646,
  },
];
