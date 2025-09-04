import { API_URL } from '@/helpers';
import { GetProductsResponse } from '@/interfaces/product.interface';

export async function getProducts() {
  try {
    const response = await fetch(API_URL + '/products');
    const data: GetProductsResponse = await response.json();

    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
