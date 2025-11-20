import { API_URL } from '@/helpers';
import { GetProductResponse } from '@/interfaces/product.interface';

export default async function getProduct(id: string) {
  try {
    const response = await fetch(API_URL + '/products/' + id);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
    }

    const data: GetProductResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
