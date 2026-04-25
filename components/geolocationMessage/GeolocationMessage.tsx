'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGeocoding } from '@/hooks/useGeocoding';
import { Message } from '@/components/message/Message';

interface GeolocationMessageProps {
  latitude: number | null;
  longitude: number | null;
}

export const GeolocationMessage = ({ latitude, longitude }: GeolocationMessageProps) => {
  const { isAuthenticated } = useAuth();
  const { city, isLoading, error, getCityFromCoords } = useGeocoding();
  const [messageShown, setMessageShown] = useState(false);

  // Отладочный лог
  useEffect(() => {
    console.log('GeolocationMessage debug:', {
      isAuthenticated,
      latitude,
      longitude,
      city,
      isLoading,
      error,
      messageShown,
    });
  }, [isAuthenticated, latitude, longitude, city, isLoading, error, messageShown]);

  useEffect(() => {
    // Проверяем, было ли уже показано сообщение в этой сессии
    const shown = sessionStorage.getItem('geolocationMessageShown');
    if (shown === 'true') {
      setMessageShown(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && latitude && longitude && !messageShown && !city && !isLoading) {
      console.log('GeolocationMessage: calling getCityFromCoords');
      getCityFromCoords(latitude, longitude);
    }
  }, [isAuthenticated, latitude, longitude, messageShown, city, isLoading, getCityFromCoords]);

  useEffect(() => {
    if (city && isAuthenticated && !messageShown) {
      // Устанавливаем флаг, что сообщение показано
      sessionStorage.setItem('geolocationMessageShown', 'true');
      setMessageShown(true);
    }
  }, [city, isAuthenticated, messageShown]);

  if (!isAuthenticated) {
    console.log('GeolocationMessage: not authenticated');
    return null;
  }
  if (messageShown) {
    console.log('GeolocationMessage: already shown');
    return null;
  }
  if (error) {
    console.log('GeolocationMessage: error', error);
    return null;
  }
  if (!city) {
    console.log('GeolocationMessage: city not determined');
    return null;
  }

  console.log('GeolocationMessage: rendering message with city', city);
  return (
    <Message
      isError={false}
      text={`Вы из города ${city}`}
      isLong={false}
    />
  );
};