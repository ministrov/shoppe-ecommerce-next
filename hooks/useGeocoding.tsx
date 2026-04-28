'use client';

import { useState, useCallback } from 'react';

/**
 * Хук для геокодирования: преобразования географических координат (широта, долгота) в название города.
 * Использует Nominatim API OpenStreetMap.
 *
 * @returns {Object} Объект с состоянием и методом геокодирования:
 * @returns {string | null} city - Название определённого города (или null, если ещё не определено)
 * @returns {boolean} isLoading - Флаг выполнения запроса
 * @returns {string | null} error - Текст ошибки (или null, если ошибки нет)
 * @returns {Function} getCityFromCoords - Асинхронная функция для получения города по координатам
 *
 * @example
 * const { city, isLoading, error, getCityFromCoords } = useGeocoding();
 * useEffect(() => {
 *   getCityFromCoords(55.7558, 37.6176); // Москва
 * }, []);
 */
export function useGeocoding() {
  const [city, setCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCityFromCoords = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    try {
      // Используем Nominatim API (бесплатный, требует attribution)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=ru`
      );
      if (!response.ok) throw new Error('Geocoding failed');
      const data = await response.json();
      const cityName = data.address?.city || data.address?.town || data.address?.village;
      setCity(cityName || 'Неизвестный город');
      return cityName;
    } catch (err) {
      setError('Не удалось определить город');
      console.error('Geocoding error:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { city, isLoading, error, getCityFromCoords };
}