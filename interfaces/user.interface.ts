/**
 * Пользователь системы.
 */
export interface User {
  /** Уникальный идентификатор пользователя */
  id: number;
  /** Полное имя пользователя */
  name: string;
  /** Email пользователя */
  email: string;
  /** Номер телефона */
  phone: string;
  /** Адрес доставки */
  deliver_address: string;
}
