import { API_URL } from '@/helpers';
import { GetProductResponse } from '@/interfaces/product.interface';

export async function getProduct(id: string) {
  try {
    const response = await fetch(API_URL + '/products/' + id);
    const data: GetProductResponse = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
