import { API_URL } from '@/helpers';
import { GetProductResponse } from '@/interfaces/product.interface';
import { USE_MOCK_DATA } from '@/mocks/categories.mock';
import { getMockProduct } from '@/mocks/product.mock';

export default async function getProduct(id: string) {
  // Использовать моки если включен флаг
  if (USE_MOCK_DATA) {
    return await getMockProduct(id);
  }

  // Проверяем, что API_URL определен
  if (!API_URL) {
    console.warn('API_URL is not defined. Please set NEXT_PUBLIC_API environment variable.');
    // Возвращаем моковые данные если API_URL не определён
    return await getMockProduct(id);
  }

  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
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
    // Возвращаем моковые данные при ошибке fetch
    return await getMockProduct(id);
  }
}
