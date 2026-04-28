/**
 * Категория товара.
 */
export interface Category {
  /** Уникальный идентификатор категории */
  id: number;
  /** Название категории */
  name: string;
  /** Человеко-читаемый псевдоним для URL */
  alias: string;
}

/**
 * Ответ сервера на запрос списка категорий.
 */
export interface GetCategoryResponse {
  /** Массив категорий */
  categories: Category[];
}
