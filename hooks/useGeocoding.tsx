'use client';

import { useState, useCallback } from 'react';

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