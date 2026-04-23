import { API_URL } from '@/helpers';
import { GetProductResponse } from '@/interfaces/product.interface';

export default async function getProduct(id: string) {
  try {
    const response = await fetch(API_URL + '/products/' + id, {
      next: {
        // Кэшируем детали продукта на 300 секунд (5 минут) в production
        revalidate: process.env.NODE_ENV === 'production' ? 300 : 0,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
    }

    const data: GetProductResponse = await response.json();

    return data;
  } catch (error) {
    // В production можно использовать сервис логирования
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching product:', error);
    }
    throw error; // Пробрасываем ошибку для обработки в компоненте
  }
}
