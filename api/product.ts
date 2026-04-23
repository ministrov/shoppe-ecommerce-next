import { API_URL } from '@/helpers';
import { GetProductResponse } from '@/interfaces/product.interface';

export default async function getProduct(id: string) {
  // Проверяем, что API_URL определен
  if (!API_URL) {
    console.warn('API_URL is not defined. Please set NEXT_PUBLIC_API environment variable.');
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      next: { revalidate: process.env.NODE_ENV === 'production' ? 300 : 0 },
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
    // Возвращаем null вместо выброса ошибки
    return null;
  }
}
