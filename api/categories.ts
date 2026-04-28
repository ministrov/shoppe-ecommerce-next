import { API_URL } from '@/helpers';
import { GetCategoryResponse } from '@/interfaces/category.interface';
import { USE_MOCK_DATA, getMockCategories } from '@/mocks/categories.mock';

/**
 * Получает список категорий товаров.
 * В зависимости от флага USE_MOCK_DATA возвращает моковые данные или загружает с сервера.
 * В случае ошибки или отсутствия API_URL возвращает пустой массив.
 *
 * @returns {Promise<Array>} Промис с массивом категорий
 *
 * @example
 * const categories = await getCategories();
 * console.log(`Загружено ${categories.length} категорий`);
 */
export default async function getCategories() {
  // Использовать моки если включен флаг
  if (USE_MOCK_DATA) {
    return await getMockCategories();
  }

  // Проверяем, что API_URL определен
  if (!API_URL) {
    console.warn('API_URL is not defined. Please set NEXT_PUBLIC_API environment variable.');
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/categories`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch categories: ${response.status} ${response.statusText}`
      );
    }

    const data: GetCategoryResponse | undefined = await response.json();
    return data?.categories || [];
  } catch (error) {
    // В production можно использовать сервис логирования
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching categories:', error);
    }
    // Возвращаем пустой массив вместо выброса ошибки
    return [];
  }
}
