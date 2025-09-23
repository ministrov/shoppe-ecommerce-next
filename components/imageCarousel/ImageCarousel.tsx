import Image from 'next/image';
import { ImageCarouselProps } from './ImageCarousel.interface';
import styles from './ImageCarousel.module.css';

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  return (
    <ul className={styles.imgCarousel}>
      {images.map((image, index) => (
        <li
          key={index}
          className={`img-carousel__item ${index === 0 ? 'active' : ''}`}
        >
          <Image
            src={image}
            alt={`Product image ${index + 1}`}
            width={index === 0 ? 570 : 120}
            height={index === 0 ? 630 : 120}
          />
        </li>
      ))}
    </ul>
  )
}
