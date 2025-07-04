type GeolocationProps = {
  latitude: number | null,
  longitude: number | null
}

export const Geolocation = ({ latitude, longitude }: GeolocationProps) => {
  return (
    <div>
      <h2>Geolocation:</h2>
      <div>Latitude: {latitude}</div>
      <div>Longitude: {longitude}</div>
    </div>
  );
};