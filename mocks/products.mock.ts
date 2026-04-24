import { Product } from '@/interfaces/product.interface';
import { MOCK_CATEGORIES } from './categories.mock';

const generateMockProducts = (): Product[] => {
  const products: Product[] = [];
  const productNames = [
    'Смартфон', 'Ноутбук', 'Наушники', 'Футболка', 'Джинсы',
    'Кроссовки', 'Рюкзак', 'Часы', 'Книга', 'Мяч',
    'Крем для лица', 'Лампа', 'Конструктор', 'Авточехол'
  ];

  for (let i = 1; i <= 50; i++) {
    const category = MOCK_CATEGORIES[Math.floor(Math.random() * MOCK_CATEGORIES.length)];
    const hasDiscount = Math.random() > 0.7;
    
    products.push({
      id: i,
      name: `${productNames[Math.floor(Math.random() * productNames.length)]} ${i}`,
      price: Math.floor(Math.random() * 1000) + 100,
      short_description: `Краткое описание товара ${i}`,
      long_description: `Подробное описание товара ${i}. Это качественный продукт с отличными характеристиками.`,
      sku: `SKU-${1000 + i}`,
      discount: hasDiscount ? Math.floor(Math.random() * 50) + 10 : 0,
      images: [`/mock-card-img-${(i % 5) + 1}.png`],
      category_id: category.id,
      category: category,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
  
  return products;
};

export const MOCK_PRODUCTS = generateMockProducts();

export interface MockProductsFilters {
  category_id?: string;
  search?: string;
  has_discount?: boolean;
  price_from?: number;
  price_to?: number;
}

export const getMockProducts = async (filters?: MockProductsFilters): Promise<{ products: Product[]; total: number }> => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...MOCK_PRODUCTS];
  
  // Фильтрация по категории
  if (filters?.category_id) {
    filteredProducts = filteredProducts.filter(
      p => p.category_id === parseInt(filters.category_id!)
    );
  }
  
  // Фильтрация по поиску
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      p => p.name.toLowerCase().includes(searchLower) || 
           p.short_description.toLowerCase().includes(searchLower)
    );
  }
  
  // Фильтрация по скидке
  if (filters?.has_discount) {
    filteredProducts = filteredProducts.filter(p => p.discount > 0);
  }
  
  // Фильтрация по цене
  if (filters?.price_from !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price >= filters.price_from!);
  }
  
  if (filters?.price_to !== undefined) {
    filteredProducts = filteredProducts.filter(p => p.price <= filters.price_to!);
  }
  
  return {
    products: filteredProducts,
    total: filteredProducts.length,
  };
};