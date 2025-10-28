export const API_URL = process.env.NEXT_PUBLIC_API;

// Форматирование описания с сохранением переносов строк
export const formatDescription = (text: string) => {
  return text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      {index < text.split('\n').length - 1 && <br />}
    </span>
  ));
};

export const declineNumber = (number: number, titles: [string, string, string]): string => {
  const remainer = number % 10;
  const exeptions = [11, 12, 13, 14];

  console.log(remainer);

  if (remainer === 1 && !exeptions.includes(number)) {
    return titles[0];
  } else if (remainer > 1 && remainer < 5 && !exeptions.includes(number)) {
    return titles[1];
  } else {
    return titles[2];
  }
};

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
