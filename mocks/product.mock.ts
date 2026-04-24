import { GetProductResponse } from '@/interfaces/product.interface';
import { MOCK_PRODUCTS } from './products.mock';
import { Review } from '@/interfaces/review.interface';

// Моковые отзывы
const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    product_id: 1,
    name: 'Алексей Иванов',
    rating: 5,
    text: 'Отличный товар, полностью соответствует описанию. Качество на высоте!',
    created_at: '2024-03-15T10:30:00Z',
  },
  {
    id: 2,
    product_id: 1,
    name: 'Мария Петрова',
    rating: 4,
    text: 'Хороший продукт, но доставка заняла больше времени, чем ожидалось.',
    created_at: '2024-03-10T14:20:00Z',
  },
  {
    id: 3,
    product_id: 2,
    name: 'Дмитрий Сидоров',
    rating: 5,
    text: 'Превзошёл все ожидания. Рекомендую к покупке!',
    created_at: '2024-03-05T09:15:00Z',
  },
  {
    id: 4,
    product_id: 3,
    name: 'Ольга Кузнецова',
    rating: 3,
    text: 'Нормальный товар за свои деньги. Есть небольшие недочёты.',
    created_at: '2024-02-28T16:45:00Z',
  },
  {
    id: 5,
    product_id: 4,
    name: 'Иван Николаев',
    rating: 5,
    text: 'Идеальное соотношение цены и качества. Буду покупать ещё.',
    created_at: '2024-02-20T11:10:00Z',
  },
];

// Моковая функция для получения продукта по ID
export const getMockProduct = async (id: string): Promise<GetProductResponse | null> => {
  // Имитация задержки сети
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const productId = parseInt(id);
  
  // Ищем продукт в моковых данных
  const product = MOCK_PRODUCTS.find(p => p.id === productId);
  
  if (!product) {
    return null;
  }
  
  // Фильтруем отзывы для данного продукта
  const productReviews = MOCK_REVIEWS.filter(review => review.product_id === productId);
  
  return {
    product,
    reviews: productReviews,
  };
};