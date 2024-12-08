import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%', // Adjust height as needed
};

const initialCenter = {
  lat: 20.5937,
  lng: 78.9629, // Initial center for India
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(initialCenter);

  useEffect(() => {
    const watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
        console.log(position.coords); 
      },
      (error) => {
        console.error('Error tracking location:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        <Marker position={currentPosition} />
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;