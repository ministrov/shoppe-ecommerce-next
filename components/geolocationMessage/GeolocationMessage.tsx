'use client';

import { useEffect } from 'react';
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

  // Отладочный лог
  useEffect(() => {
    console.log('GeolocationMessage debug:', {
      isAuthenticated,
      latitude,
      longitude,
      city,
      isLoading,
      error,
    });
  }, [isAuthenticated, latitude, longitude, city, isLoading, error]);

  useEffect(() => {
    if (isAuthenticated && latitude && longitude && !city && !isLoading) {
      console.log('GeolocationMessage: calling getCityFromCoords');
      getCityFromCoords(latitude, longitude);
    }
  }, [isAuthenticated, latitude, longitude, city, isLoading, getCityFromCoords]);

  if (!isAuthenticated) {
    console.log('GeolocationMessage: not authenticated');
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