import { User } from './user.interface';

/**
 * Ответ сервера на успешную аутентификацию.
 */
export interface LoginResponse {
  /** JWT-токен для последующих авторизованных запросов */
  token: string;
  /** Данные авторизованного пользователя */
  user: User;
}

/**
 * Запрос на аутентификацию (логин).
 */
export interface LoginRequest {
  /** Email пользователя */
  email: string;
  /** Пароль пользователя */
  password: string;
}
