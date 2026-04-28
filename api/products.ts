import { API_URL } from '@/helpers';
import { GetProductsResponse } from '@/interfaces/product.interface';
import { USE_MOCK_DATA } from '@/mocks/categories.mock';
import { getMockProducts } from '@/mocks/products.mock';

/**
 * Параметры запроса для получения списка товаров.
 */
export interface GetProductsParams {
  /** ID категории для фильтрации */
  category_id?: string;
  /** Строка поиска по названию товара */
  search?: string;
  /** Флаг наличия скидки */
  has_discount?: boolean;
  /** Минимальная цена */
  price_from?: number;
  /** Максимальная цена */
  price_to?: number;
  /** Лимит количества товаров на странице */
  limit?: number;
  /** Смещение (пагинация) */
  offset?: number;
}

/**
 * Получает список товаров с возможностью фильтрации и пагинации.
 * В зависимости от флага USE_MOCK_DATA возвращает моковые данные или загружает с сервера.
 * В случае ошибки или отсутствия API_URL возвращает пустой список.
 *
 * @param params - Параметры фильтрации и пагинации
 * @returns {Promise<GetProductsResponse>} Промис с данными товаров и метаданными
 *
 * @example
 * const data = await getProducts({ category_id: '1', limit: 10, offset: 0 });
 * console.log(`Найдено ${data.total} товаров`);
 */
export default async function getProducts(params: GetProductsParams = {}) {
  // Использовать моки если включен флаг
  if (USE_MOCK_DATA) {
    const result = await getMockProducts({
      category_id: params.category_id,
      search: params.search,
      has_discount: params.has_discount,
      price_from: params.price_from,
      price_to: params.price_to,
    });
    
    return {
      products: result.products,
      total: result.total,
      limit: params.limit || 10,
      offset: params.offset || 0,
    };
  }

  // Оригинальный запрос к API
  if (!API_URL) {
    console.warn('API_URL is not defined. Please set NEXT_PUBLIC_API environment variable.');
    return { products: [], total: 0, limit: 10, offset: 0 };
  }

  try {
    const queryParams = new URLSearchParams();
    
    if (params.category_id) queryParams.append('category_id', params.category_id);
    if (params.search) queryParams.append('search', params.search);
    if (params.has_discount) queryParams.append('has_discount', 'true');
    if (params.price_from !== undefined) queryParams.append('price_from', params.price_from.toString());
    if (params.price_to !== undefined) queryParams.append('price_to', params.price_to.toString());
    if (params.limit) queryParams.append('limit', params.limit.toString());
    if (params.offset) queryParams.append('offset', params.offset.toString());

    const response = await fetch(`${API_URL}/products?${queryParams}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
    }

    const data: GetProductsResponse = await response.json();
    return data;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error fetching products:', error);
    }
    return { products: [], total: 0, limit: 10, offset: 0 };
  }
}
