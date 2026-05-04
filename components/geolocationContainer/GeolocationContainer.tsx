'use client';

import { useState, useEffect, useRef } from 'react';
import { GeolocationMessage } from '../geolocationMessage/GeolocationMessage';
import styles from './GeolocationContainer.module.css';

/**
 * Компонент-контейнер для получения геолокации пользователя.
 * Использует браузерный API Geolocation для определения координат.
 * При успешном получении координат отображает сообщение с городом пользователя.
 * Сообщение автоматически скрывается через 3 секунды.
 *
 * @returns {JSX.Element} Контейнер геолокации (не отображает визуальных элементов самостоятельно)
 *
 * @example
 * // Использование в layout или странице
 * <GeolocationContainer />
 */
export const GeolocationContainer = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef<boolean>(true);

  const handleSuccess = ({ coords: { latitude, longitude } }: { coords: { latitude: number, longitude: number } }) => {
    if (!isMounted.current) return;
    setLatitude(latitude);
    setLongitude(longitude);
    setShowMessage(true);
  };

  const handleError = (error: GeolocationPositionError) => {
    if (!isMounted.current) return;
    console.error('Geolocation error:', error);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      console.log('Requesting geolocation...');
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error('Geolocation not supported');
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (showMessage) {
      // Очищаем предыдущий таймер, если есть
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Устанавливаем таймер на 3 секунды для скрытия сообщения
      timerRef.current = setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showMessage]);

  return (
    <div className={styles.container}>
      {showMessage && <GeolocationMessage latitude={latitude} longitude={longitude} />}
    </div>
  );
};