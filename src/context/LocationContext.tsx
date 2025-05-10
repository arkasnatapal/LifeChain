import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

interface LocationContextType {
  coordinates: Coordinates;
  locationPermission: boolean;
  loading: boolean;
  error: string | null;
  requestLocation: () => Promise<void>;
}

const LocationContext = createContext<LocationContextType>({
  coordinates: { latitude: null, longitude: null },
  locationPermission: false,
  loading: false,
  error: null,
  requestLocation: async () => {},
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ latitude: null, longitude: null });
  const [locationPermission, setLocationPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        });
      });

      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLocationPermission(true);
    } catch (err) {
      console.error('Error getting location:', err);
      setError('Unable to retrieve your location. Please enable location services.');
      setLocationPermission(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if permission was previously granted
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          setLocationPermission(true);
          requestLocation();
        }
      });
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        coordinates,
        locationPermission,
        loading,
        error,
        requestLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};