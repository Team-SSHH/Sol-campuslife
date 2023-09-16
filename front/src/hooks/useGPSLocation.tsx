import { useState, useEffect } from "react";

interface GeoLocationState {
  latitude: number | null;
  longitude: number | null;
}

const useGPSLocation = (): GeoLocationState => {
  const [MyLocation, setMyLocation] = useState<GeoLocationState>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    let watchId: number | null = null;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) =>
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      );
    } else {
      alert("위치가 안찍혀오");
    }

    // Cleanup function
    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return MyLocation;
};

export default useGPSLocation;
