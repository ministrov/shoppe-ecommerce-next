'use client';

import { useState, useEffect } from 'react';
import { Geolocation } from '../geolocation/Geolocation';
import { GeolocationMessage } from '../geolocationMessage/GeolocationMessage';
import styles from './GeolocationContainer.module.css';

const GeolocationContainer = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleSuccess = ({ coords: { latitude, longitude } }: { coords: { latitude: number, longitude: number } }) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess);
    }
  }, []);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <div className={styles.container}>
      {isDevelopment && <Geolocation latitude={latitude} longitude={longitude} />}
      <GeolocationMessage latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default GeolocationContainer;