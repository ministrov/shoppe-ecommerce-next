import { API_URL } from '@/helpers';

/**
 * Универсальная функция для выполнения HTTP-запросов к API.
 * Автоматически добавляет базовый URL и заголовок Content-Type: application/json.
 * В случае ошибки HTTP (статус не 2xx) выбрасывает исключение.
 *
 * @template T - Ожидаемый тип данных ответа
 * @param endpoint - Относительный путь эндпоинта (добавляется к API_URL)
 * @param options - Дополнительные опции fetch (метод, тело, заголовки и т.д.)
 * @returns Промис с данными ответа в формате JSON
 * @throws {Error} Если ответ не успешен (status не в диапазоне 200-299)
 *
 * @example
 * const data = await fetchAPI<Product[]>('/products');
 * const created = await fetchAPI('/products', {
 *   method: 'POST',
 *   body: JSON.stringify({ name: 'New Product' })
 * });
 */
export default async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
