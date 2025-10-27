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

const titles: string[] = ['Lira Earrings', 'Hal Earrings', 'Kaede Hair Pin Set Of 3 ', 'Hair Pin Set of 3', 'Plaine Necklace', 'Yuki Hair Pin Set of 3'];

export const mockProducts: MockProduct[] = Array.from({ length: 50 }, (_, i) => {
  const titleStr = titles[i % titles.length];
  return {
    id: i + 1,
    title: titleStr,
    price: 23,
    images: [`/images/product${(i % 4) + 1}.jpg`, `/images/product${(i % 5) + 1}.jpg`, `/images/product${(i % 7) + 1}.jpg`, `/images/product${(i % 6) + 1}.jpg`, `/images/product${(i % 7) + 1}.jpg`]
  };
});
