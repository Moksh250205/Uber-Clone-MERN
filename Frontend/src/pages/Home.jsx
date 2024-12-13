import React, { useState, useRef, useEffect, useContext, useCallback  } from 'react';
import { MapPin, Navigation, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRidePanel from '../components/ConfirmRidePanel';
import axios from 'axios';
import { SocketContext } from '../context/socketContext';
import { userDataContext } from '../context/userContext';
import WaitingForDriver from '../components/WaitingForDriver';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

gsap.registerPlugin(useGSAP);

const Home = () => {
  const [locationPanelOpen, setLocationPanelOpen] = useState(false);
  const [divHeight, setDivHeight] = useState(0);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [rideConfirmation, setRideConfirmation] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);

  const [distanceTime, setDistanceTime] = useState({});
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [vehicleUrl, setVehicleUrl] = useState('');
  const [ride, setRide] = useState(null);
  const [otp, setOtp] = useState('');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
  });

  const confirmRidePanelRef = useRef(null);
  const vehiclelocationPanelRef = useRef(null);
  const locationPanelRef = useRef(null);
  const containerRef = useRef(null);
  const WaitingForDriverRef = useRef(null);

  const socket = useContext(SocketContext);
  const { user } = useContext(userDataContext);

  useEffect(() => {
    socket.emit('join', { userType: 'user', userId: user._id })
  }, [user]);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.getBoundingClientRect().height;
      setDivHeight(height);
    }
  });

  useEffect(() => {
    socket.on('ride-confirmed', (ride) => {
      setConfirmRidePanel(false);
      setWaitingForDriverPanel(true);
      setRide(ride);
    });

    socket.on('ride-started', (ride) => {
      setRide(ride);
      navigate('/riding', { state: { ride, vehicleUrl } });
    }); 
  }, []);

  const handlePickupChange = async (value) => {
    if (value === '') return;
    setFormData((prev) => ({ ...prev, pickup: value }));
    setActiveField('pickup');
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/maps/get-suggestions`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setPickupSuggestions(response.data || []);
    } catch (error) {
      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = async (value) => {
    if (value === '') return;
    setFormData((prev) => ({ ...prev, destination: value }));
    setActiveField('destination');
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/maps/get-suggestions`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDestinationSuggestions(response.data || []);
    } catch (error) {
      setDestinationSuggestions([]);
    }
  };

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  
  const debouncedPickupChange = useCallback(debounce(handlePickupChange, 300), []);
  const debouncedDestinationChange = useCallback(debounce(handleDestinationChange, 300), []);

  const onPickupInputChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, pickup: value }));
    setActiveField('pickup');
    debouncedPickupChange(value);
  };

  const onDestinationInputChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, destination: value }));
    setActiveField('destination');
    debouncedDestinationChange(value);
  };

  async function findTrip() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ride/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const { fare, distanceTime } = response.data.data;

      setFare(fare);
      setDistanceTime(distanceTime);

      setVehiclePanel(true);
      setLocationPanelOpen(false);
    } catch (error) {
      console.error('Error fetching trip data:', error);
    }
  }

  const createRide = async () => {
    try {
      const duration = distanceTime.duration.value;
      const distance = distanceTime.distance.value;
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ride/create-ride`, { pickup, destination, vehicleType, fare, duration, distance }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOtp(response.data.data.otp);
      setRide(response.data);
    } catch (error) {
      console.error(error);
    }
  }


  const panelHeight = window.innerHeight - divHeight;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const { pickup, destination } = formData;

  useGSAP(() => {
    if (locationPanelOpen) {
      gsap.to(locationPanelRef.current, {
        height: panelHeight,
        duration: 0.3,
        ease: 'power4.easeInOut',
      });
    } else {
      gsap.to(locationPanelRef.current, {
        height: 0,
        duration: 0.3,
      });
    }
  }, [locationPanelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclelocationPanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(vehiclelocationPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0%)',
        duration: 0.3,
      });
    } else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.3,
      });
    }
  }, [waitingForDriverPanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0%)',
        duration: 0.3,
        ease: 'power4.easeInOut',
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(110%)',
        duration: 0.3,
      });
    }
  }, [confirmRidePanel]);

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <div className='h-screen z-30 absolute w-screen'>
        <LiveTracking />
      </div>
      <div className="flex flex-col z-50 justify-end h-screen absolute top-0 w-full">
        <div ref={containerRef} className="h-auto bg-white flex flex-col justify-end p-5 relative">
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 items-center relative">
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 h-12 w-0.5 bg-gray-400"></div>

            <div className="relative flex items-center w-full">
              <MapPin className="absolute left-4 text-gray-600 mt-4" size={20} />
              <input
                onClick={() => setLocationPanelOpen(true)}
                onChange={onPickupInputChange}
                name="pickup"
                value={pickup}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4 p-5"
                type="text"
                placeholder="Add a pick-up location"
              />
            </div>

            <div className="relative flex items-center w-full">
              <Navigation className="absolute left-4 text-gray-600 mb-4" size={20} />
              <input
                onClick={() => setLocationPanelOpen(true)}
                onChange={onDestinationInputChange}
                name="destination"
                value={destination}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4 p-5"
                type="text"
                placeholder="Enter your destination"
              />
            </div>

            <button onClick={findTrip} className='flex w-full items-center justify-center bg-black p-3 rounded-lg text-white '>Find Ride</button>
          </form>
          {locationPanelOpen && (
            <button
              onClick={() => setLocationPanelOpen(false)}
              className="absolute top-3 right-3 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              <ArrowDown size={20} className="text-gray-700" />
            </button>
          )}
        </div>
        <div ref={locationPanelRef} className="bg-white z-50">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setFormData={setFormData}
            setLocationPanelOpen={setLocationPanelOpen}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclelocationPanelRef} className="fixed z-50 bottom-0 p-5 translate-y-full w-full bg-white">
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          fare={fare}
          setVehicleType={setVehicleType}
          setVehicleUrl={setVehicleUrl}
        />
      </div>

      <div ref={confirmRidePanelRef} className="fixed z-50 bottom-0 w-full">
        <ConfirmRidePanel
          rideConfirmation={rideConfirmation}
          setRideConfirmation={setRideConfirmation}
          setConfirmRidePanel={setConfirmRidePanel}
          vehicleUrl={vehicleUrl}
          destination={destination}
          pickup={pickup}
          vehicleType={vehicleType}
          fare={fare}
          createRide={createRide}
        />
      </div>
      <div ref={WaitingForDriverRef} className='fixed bottom-0 p-5 z-50 translate-y-full w-full bg-white'>
        <WaitingForDriver
          otp={otp}
          ride={ride}
          vehicleUrl={vehicleUrl}
        />
      </div>
    </div>
  );
};

export default Home;