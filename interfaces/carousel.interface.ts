export interface CarouselImage {
  src: string;
  mobileSrc: string;
  alt: string;
  width: number;
  height: number;
}

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
