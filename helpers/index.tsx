import React from 'react';

/**
 * Базовый URL API, загружаемый из переменной окружения NEXT_PUBLIC_API.
 * Используется для всех запросов к бэкенду.
 *
 * @example
 * const response = await fetch(`${API_URL}/products`);
 */
export const API_URL = process.env.NEXT_PUBLIC_API;

/**
 * Форматирует многострочный текст, разбивая его по символам новой строки и сохраняя переносы.
 * Каждая строка оборачивается в `<span>`, а между строками вставляется `<br />` (кроме последней).
 * Полезно для отображения описаний товаров, где нужно сохранить разбиение на абзацы.
 *
 * @param text - Исходный текст, который может содержать символы новой строки (`\n`)
 * @returns Массив React-элементов, готовых для вставки в JSX
 *
 * @example
 * const description = "Первая строка\nВторая строка";
 * const formatted = formatDescription(description);
 * // Возвращает [<span>Первая строка<br /></span>, <span>Вторая строка</span>]
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
 * Реализует правила русского языка для числительных (1, 21, 31 → форма 1; 2-4, 22-24 → форма 2; остальные → форма 3).
 * Учитывает исключения для чисел 11-14 (они используют форму 3).
 *
 * @param number - Число, для которого нужно склонение
 * @param titles - Массив из трёх форм слова в порядке: [форма для одного, форма для двух-четырёх, форма для многих]
 * @returns Подходящая форма слова
 *
 * @example
 * declineNumber(1, ['отзыв', 'отзыва', 'отзывов']) // 'отзыв'
 * declineNumber(3, ['отзыв', 'отзыва', 'отзывов']) // 'отзыва'
 * declineNumber(5, ['отзыв', 'отзыва', 'отзывов']) // 'отзывов'
 * declineNumber(21, ['отзыв', 'отзыва', 'отзывов']) // 'отзыв'
 * declineNumber(12, ['отзыв', 'отзыва', 'отзывов']) // 'отзывов' (исключение)
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
 * Специализированная обёртка над `declineNumber` для слова "отзыв".
 *
 * @param count - Количество отзывов
 * @returns "отзыв", "отзыва" или "отзывов"
 *
 * @example
 * declineReviewWord(1) // 'отзыв'
 * declineReviewWord(3) // 'отзыва'
 * declineReviewWord(5) // 'отзывов'
 * declineReviewWord(21) // 'отзыв'
 */
export const declineReviewWord = (count: number): string => {
  return declineNumber(count, ['отзыв', 'отзыва', 'отзывов']);
};
