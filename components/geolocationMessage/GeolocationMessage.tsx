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