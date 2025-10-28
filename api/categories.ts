import { API_URL } from '@/helpers';
import { GetCategoryResponse } from '@/interfaces/category.interface';

export async function getCategories() {
  try {
    const response = await fetch(API_URL + '/categories');

    if (!response.ok) {
      throw new Error(
        `Failed to fetch categories: ${response.status} ${response.statusText}`
      );
    }

    const data: GetCategoryResponse | undefined = await response.json();
    return data?.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
