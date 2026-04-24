import { Category } from '@/interfaces/category.interface';

// Флаг для включения мокового режима
export const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || process.env.NODE_ENV === 'development';

// Моковые категории товаров
export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Электроника', alias: 'electronics' },
  { id: 2, name: 'Одежда', alias: 'clothing' },
  { id: 3, name: 'Обувь', alias: 'shoes' },
  { id: 4, name: 'Аксессуары', alias: 'accessories' },
  { id: 5, name: 'Книги', alias: 'books' },
  { id: 6, name: 'Спорт и отдых', alias: 'sports' },
  { id: 7, name: 'Красота и здоровье', alias: 'beauty' },
  { id: 8, name: 'Дом и сад', alias: 'home' },
  { id: 9, name: 'Игрушки', alias: 'toys' },
  { id: 10, name: 'Автотовары', alias: 'auto' },
];

// Моковая функция для получения категорий
export const getMockCategories = async (): Promise<Category[]> => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [...MOCK_CATEGORIES];
};

// Моковая функция для получения категории по ID
export const getMockCategoryById = async (id: number): Promise<Category | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const category = MOCK_CATEGORIES.find(cat => cat.id === id);
  return category || null;
};