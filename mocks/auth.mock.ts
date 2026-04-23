import { User } from '@/interfaces/user.interface';
import { LoginResponse } from '@/interfaces/auth.interface';

// Флаг для включения мокового режима (можно управлять через .env)
export const USE_MOCK_AUTH = process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true' || 
                            process.env.NODE_ENV === 'development';

// Mock пользователи для разных ролей
export const MOCK_USERS: Record<string, User> = {
  admin: {
    id: 1,
    name: 'Администратор Системы',
    email: 'admin@example.com',
    phone: '+7 (999) 123-45-67',
    deliver_address: 'г. Москва, ул. Примерная, д. 1, кв. 1',
  },
  user: {
    id: 2,
    name: 'Иван Петров',
    email: 'user@example.com',
    phone: '+7 (999) 987-65-43',
    deliver_address: 'г. Санкт-Петербург, ул. Тестовая, д. 5, кв. 10',
  },
  premium: {
    id: 3,
    name: 'Анна Сидорова',
    email: 'premium@example.com',
    phone: '+7 (999) 555-55-55',
    deliver_address: 'г. Казань, ул. Премиум, д. 15, кв. 25',
  },
};

// Mock токены для разных пользователей
export const MOCK_TOKENS: Record<string, string> = {
  admin: 'mock_admin_token_1234567890',
  user: 'mock_user_token_0987654321',
  premium: 'mock_premium_token_5555555555',
};

// Функция для получения mock-ответа аутентификации
export function getMockAuthResponse(email: string, password: string): LoginResponse | null {
  // В моковом режиме принимаем любые email/password, но для демонстрации
  // можно добавить простую логику
  
  // Если email содержит 'admin' - возвращаем admin пользователя
  if (email.includes('admin')) {
    return {
      token: MOCK_TOKENS.admin,
      user: MOCK_USERS.admin,
    };
  }
  
  // Если email содержит 'premium' - возвращаем premium пользователя
  if (email.includes('premium')) {
    return {
      token: MOCK_TOKENS.premium,
      user: MOCK_USERS.premium,
    };
  }
  
  // По умолчанию возвращаем обычного пользователя
  // Проверяем минимальные требования к паролю для реалистичности
  if (password.length >= 8) {
    return {
      token: MOCK_TOKENS.user,
      user: MOCK_USERS.user,
    };
  }
  
  return null;
}

// Функция для проверки, нужно ли использовать моковый режим
export function shouldUseMockAuth(): boolean {
  // Используем моковый режим если:
  // 1. Явно включен через переменную окружения
  // 2. Или мы в development режиме и API_URL не определен
  if (USE_MOCK_AUTH) {
    return true;
  }
  
  // Дополнительная проверка: если API_URL не определен, используем моки
  if (typeof window !== 'undefined') {
    const API_URL = process.env.NEXT_PUBLIC_API;
    if (!API_URL || API_URL === 'undefined' || API_URL.includes('undefined')) {
      console.warn('API_URL is not defined, falling back to mock auth');
      return true;
    }
  }
  
  return false;
}

// Функция для получения mock-пользователя по ID
export function getMockUserById(id: number): User | null {
  const user = Object.values(MOCK_USERS).find(user => user.id === id);
  return user || null;
}