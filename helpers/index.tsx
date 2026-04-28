import React from 'react';

export const API_URL = process.env.NEXT_PUBLIC_API;

/**
 * Форматирует многострочный текст, разбивая его по символам новой строки и сохраняя переносы.
 * Каждая строка оборачивается в `<span>`, а между строками вставляется `<br />` (кроме последней).
 *
 * @param text - Исходный текст, который может содержать символы новой строки (`\n`)
 * @returns Массив React-элементов, готовых для вставки в JSX
 */
export const formatDescription = (text: string): React.ReactElement[] => {
  const lines = text.split('\n');
  return lines.map((line, index) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 && <br />}
    </span>
  ));
};

/**
 * Склоняет существительное в зависимости от числа.
 * Принимает три формы слова: для одного, для двух-четырёх, для многих.
 * Пример: ['отзыв', 'отзыва', 'отзывов']
 *
 * @param number - Число, для которого нужно склонение
 * @param titles - Массив из трёх форм слова
 * @returns Подходящая форма слова
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
 * @param count - Количество отзывов
 * @returns "отзыв", "отзыва" или "отзывов"
 */
export const declineReviewWord = (count: number): string => {
  return declineNumber(count, ['отзыв', 'отзыва', 'отзывов']);
};
