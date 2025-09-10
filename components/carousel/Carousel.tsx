import Image from 'next/image';
import styles from './Carousel.module.css';

export const Carousel = () => {
  return (
    <div className={styles.carousel}>
      <Image src={'/home-img-1.jpg'} width={1248} height={646} alt={'Image-1'} />
      <Image src={'/home-img-2.jpg'} width={1248} height={646} alt={'Image-2'} />
      <Image src={'/home-img-1.jpg'} width={1248} height={646} alt={'Image-3'} />
    </div>
  )
}
