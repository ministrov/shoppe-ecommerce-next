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
