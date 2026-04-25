'use client';

import { useState, useEffect } from 'react';
import { Geolocation } from '../geolocation/Geolocation';
import { GeolocationMessage } from '../geolocationMessage/GeolocationMessage';
import styles from './GeolocationContainer.module.css';

const GeolocationContainer = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);

  const handleSuccess = ({ coords: { latitude, longitude } }: { coords: { latitude: number, longitude: number } }) => {
    console.log('Geolocation success:', latitude, longitude);
    setLatitude(latitude);
    setLongitude(longitude);
    setGeolocationError(null);
  };

  const handleError = (error: GeolocationPositionError) => {
    console.error('Geolocation error:', error);
    setGeolocationError(error.message);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      console.log('Requesting geolocation...');
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      setGeolocationError('Geolocation not supported');
    }
  }, []);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className={styles.container}>
      {isDevelopment && <Geolocation latitude={latitude} longitude={longitude} />}
      {isDevelopment && geolocationError && <div>Geolocation error: {geolocationError}</div>}
      <GeolocationMessage latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default GeolocationContainer;