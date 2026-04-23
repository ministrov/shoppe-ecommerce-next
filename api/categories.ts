import { API_URL } from '@/helpers';
import { GetCategoryResponse } from '@/interfaces/category.interface';

export default async function getCategories() {
  try {
    const response = await fetch(API_URL + '/categories', {
      next: {
        // Категории меняются редко, кэшируем на 1 час в production
        revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0,
      },
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
    return data?.categories;
  } catch (error) {
    // В production можно использовать сервис логирования
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching categories:', error);
    }
    throw error; // Пробрасываем ошибку для обработки в компоненте
  }
}
