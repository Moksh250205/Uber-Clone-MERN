import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, DirectionsRenderer } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const initialCenter = {
  lat: 20.5937,
  lng: 78.9629, 
};

const RouteTracking = ({ destinationAddress, caller }) => {
  const [currentPosition, setCurrentPosition] = useState(initialCenter);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const watchId = navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
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

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const token = caller === 'user' ? localStorage.getItem('token') : localStorage.getItem('captainToken');
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/maps/get-coordinates`, {
          params: { address: destinationAddress },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { ltd, lng } = response.data;
        setDestination({ lat: ltd, lng: lng });
      } catch (error) {
        console.error('Error fetching destination coordinates:', error);
      }
    };

    if (destinationAddress) {
      fetchDestination();
    }
  }, [destinationAddress]);

  useEffect(() => {
    if (currentPosition && destination) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: currentPosition,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING, // Change to WALKING, BICYCLING, or TRANSIT if needed
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error('Error fetching directions:', status);
          }
        }
      );
    }
  }, [currentPosition, destination]);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={25}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default RouteTracking;