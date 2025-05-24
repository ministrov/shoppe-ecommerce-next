import { useState, useEffect } from 'react'

const Geolocation = () => {
  const [latitude, setLatitude ] = useState<number | null>(null);
  const [longitude, setLongitude ] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess)
    }
  }, [navigator]);

  const handleSuccess = ({ coords: { latitude, longitude }}: { coords: { latitude: number, longitude: number }}) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };
  return (
    <div>
      <h2>Geolocation:</h2>
      <div>Latitude: {latitude}</div>
      <div>Longitude: {longitude}</div>
    </div>
  )
}

export default Geolocation