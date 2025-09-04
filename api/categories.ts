import { API_URL } from '@/helpers';
import { GetCategoryResponse } from '@/interfaces/category.interface';

export async function fetchCategories() {
  try {
    const response = await fetch(API_URL + '/categories');
    const data: GetCategoryResponse | undefined = await response.json();
    return data?.categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}
