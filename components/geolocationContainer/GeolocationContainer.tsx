'use client';

import { useState, useEffect, useRef } from 'react';
import { GeolocationMessage } from '../geolocationMessage/GeolocationMessage';
import styles from './GeolocationContainer.module.css';

export const GeolocationContainer = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSuccess = ({ coords: { latitude, longitude } }: { coords: { latitude: number, longitude: number } }) => {
    setLatitude(latitude);
    setLongitude(longitude);
    setShowMessage(true);
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error('Geolocation error:', error);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      console.log('Requesting geolocation...');
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      console.error('Geolocation not supported');
    }
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