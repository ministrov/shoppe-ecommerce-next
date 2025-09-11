import { CarouselImage } from '@/interfaces/carousel.interface';

export interface CarouselProps {
  images: CarouselImage[];
  autoPlayInterval?: number;
}
