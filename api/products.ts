import { API_URL } from '@/helpers';
import { GetProductsResponse } from '@/interfaces/product.interface';

export default async function getProducts() {
  await new Promise((res) => setTimeout(res, 2000));
  try {
    const response = await fetch(API_URL + '/products');

    if (!response.ok) {
      throw new Error(
        `Failed to fetch products: ${response.status} ${response.statusText}`
      );
    }
    const data: GetProductsResponse = await response.json();

    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
