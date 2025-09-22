import { API_URL } from '@/helpers';

export async function getProduct(id: string) {
  try {
    const response = await fetch(API_URL + '/catalog/' + id);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
