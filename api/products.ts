import { API_URL } from '@/helpers';
import { GetProductsResponse } from '@/interfaces/product.interface';
import { USE_MOCK_DATA } from '@/mocks/categories.mock';
import { getMockProducts } from '@/mocks/products.mock';

export interface GetProductsParams {
  category_id?: string;
  search?: string;
  has_discount?: boolean;
  price_from?: number;
  price_to?: number;
  limit?: number;
  offset?: number;
}

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
