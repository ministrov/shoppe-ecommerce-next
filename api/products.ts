import { API_URL } from '@/helpers';
import { GetProductsResponse } from '@/interfaces/product.interface';

export default async function getProducts() {
  // Проверяем, что API_URL определен
  if (!API_URL) {
    console.warn('API_URL is not defined. Please set NEXT_PUBLIC_API environment variable.');
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/products`, {
      // В Next.js 15+ revalidate указывается в корне объекта fetch для Server Components
      next: { revalidate: process.env.NODE_ENV === 'production' ? 60 : 0 },
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
    // Возвращаем пустой массив вместо выброса ошибки, чтобы приложение не падало
    // и показывало fallback UI
    return [];
  }
}
