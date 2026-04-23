import { API_URL } from '@/helpers';
import { GetProductsResponse } from '@/interfaces/product.interface';

export default async function getProducts() {
  try {
    const response = await fetch(API_URL + '/products', {
      next: {
        // Кэшируем на 60 секунд в production, 0 в development
        revalidate: process.env.NODE_ENV === 'production' ? 60 : 0,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }
    const data: GetProductsResponse = await response.json();

    return data.products;
  } catch (error) {
    // В production можно использовать сервис логирования
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching products:', error);
    }
    throw error; // Пробрасываем ошибку для обработки в компоненте
  }
}
