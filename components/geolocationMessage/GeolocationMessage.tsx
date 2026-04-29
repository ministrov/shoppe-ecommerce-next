'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGeocoding } from '@/hooks/useGeocoding';
import { Message } from '@/components/message/Message';

/**
 * Свойства компонента сообщения геолокации.
 *
 * @typedef {Object} GeolocationMessageProps
 * @property {number | null} latitude - Широта координат
 * @property {number | null} longitude - Долгота координат
 */
interface GeolocationMessageProps {
  latitude: number | null;
  longitude: number | null;
}

/**
 * Компонент сообщения с информацией о городе пользователя на основе геолокации.
 * Использует координаты для определения города через геокодинг.
 * Отображает сообщение только для аутентифицированных пользователей.
 * Использует компонент Message для отображения результата.
 *
 * @param {GeolocationMessageProps} props - Свойства компонента
 * @param {number | null} props.latitude - Широта координат
 * @param {number | null} props.longitude - Долгота координат
 * @returns {JSX.Element} Сообщение с названием города или null
 *
 * @example
 * <GeolocationMessage latitude={55.7558} longitude={37.6173} />
 */
export const GeolocationMessage = ({ latitude, longitude }: GeolocationMessageProps) => {
  const { isAuthenticated } = useAuth();
  const { city, isLoading, getCityFromCoords } = useGeocoding();

  useEffect(() => {
    if (isAuthenticated && latitude && longitude && !city && !isLoading) {
      getCityFromCoords(latitude, longitude);
    }
  }, [isAuthenticated, latitude, longitude, city, isLoading, getCityFromCoords]);

  return (
    <Message
      isError={false}
      text={`Вы из города ${city}`}
      isLong={false}
    />
  );
};