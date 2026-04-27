import { HTMLAttributes, Ref } from 'react';

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  /** Текущий рейтинг (от 0 до 5) */
  rating: number;
  /** Можно ли изменять рейтинг */
  isEditable?: boolean;
  /** Функция для обновления рейтинга */
  setRating?: (rating: number) => void;
  /** Ошибка валидации */
  error?: { message: string };
  /** Ref для доступа к корневому элементу */
  ref?: Ref<HTMLDivElement>;
}