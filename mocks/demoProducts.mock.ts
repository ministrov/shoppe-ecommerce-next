/**
 * Интерфейс демонстрационного продукта для моковых карточек.
 */
export interface MockProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
}

const titles: string[] = [
  'Lira Earrings',
  'Hal Earrings',
  'Kaede Hair Pin Set Of 3 ',
  'Hair Pin Set of 3',
  'Plaine Necklace',
  'Yuki Hair Pin Set of 3'
];

const images: string[] = [
  '/mock-card-img-1.png',
  '/mock-card-img-2.png',
  '/mock-card-img-3.png',
  '/mock-card-img-4.png',
  '/mock-card-img-5.png'
];

/**
 * Массив из 50 демонстрационных продуктов для отображения в UI, когда реальные данные недоступны.
 */
export const demoProducts: MockProduct[] = Array.from({ length: 50 }, (_, i) => {
  const titleStr = titles[i % titles.length];
  const price = 300 + ((i * 37) % 1701);
  return {
    id: i + 1,
    title: titleStr,
    price,
    images: [images[i % images.length]]
  };
});