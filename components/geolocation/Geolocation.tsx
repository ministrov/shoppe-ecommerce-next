import { useState, useEffect } from 'react'

const Geolocation = () => {
  const [latitude, setLatitude ] = useState<number | null>(null);
  const [longitude, setLongitude ] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess)
    }
  }, [navigator]);

  const handleSuccess = ({ coords: { latitude, longitude }}: { coords: { latitude: number, longitude: number }}) => {};
  return (
    <div>Geolocation</div>
  )
}

export default Geolocation