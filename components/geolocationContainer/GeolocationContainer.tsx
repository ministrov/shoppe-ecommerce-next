'use client';

import { useState, useEffect } from 'react';
import { GeolocationMessage } from '../geolocationMessage/GeolocationMessage';
import styles from './GeolocationContainer.module.css';

export const GeolocationContainer = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleSuccess = ({ coords: { latitude, longitude } }: { coords: { latitude: number, longitude: number } }) => {
    setLatitude(latitude);
    setLongitude(longitude);
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

  return (
    <div className={styles.container}>
      <GeolocationMessage latitude={latitude} longitude={longitude} />
    </div>
  );
};