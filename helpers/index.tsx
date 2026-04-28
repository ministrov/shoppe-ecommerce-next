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

/**
 * Склоняет существительное в зависимости от числа.
 * Принимает три формы слова: для одного, для двух-четырёх, для многих.
 * Пример: ['отзыв', 'отзыва', 'отзывов']
 *
 * @param {number} number - Число, для которого нужно склонение
 * @param {[string, string, string]} titles - Массив из трёх форм слова
 * @returns {string} Подходящая форма слова
 */
export const declineNumber = (number: number, titles: [string, string, string]): string => {
  const remainder = number % 10;
  const exceptions = [11, 12, 13, 14];

  if (remainder === 1 && !exceptions.includes(number % 100)) {
    return titles[0];
  } else if (remainder >= 2 && remainder <= 4 && !exceptions.includes(number % 100)) {
    return titles[1];
  } else {
    return titles[2];
  }
};

/**
 * Возвращает правильную форму слова "отзыв" в зависимости от числа.
 *
 * @param {number} count - Количество отзывов
 * @returns {string} "отзыв", "отзыва" или "отзывов"
 */
export const declineReviewWord = (count: number): string => {
  return declineNumber(count, ['отзыв', 'отзыва', 'отзывов']);
};
