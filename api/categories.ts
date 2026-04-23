import { API_URL } from '@/helpers';
import { GetCategoryResponse } from '@/interfaces/category.interface';

export default async function getCategories() {
  // Проверяем, что API_URL определен
  if (!API_URL) {
    console.warn('API_URL is not defined. Please set NEXT_PUBLIC_API environment variable.');
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/categories`, {
      next: { revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0 },
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
