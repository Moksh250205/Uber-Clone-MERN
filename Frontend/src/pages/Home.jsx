import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Navigation, ArrowDown, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRidePanel from '../components/ConfirmRidePanel';

gsap.registerPlugin(useGSAP);

const Home = () => {
  const [locationPanelOpen, setLocationPanelOpen] = useState(false); //opens location panel
  const [divHeight, setDivHeight] = useState(0);
  const [vehiclePanel, setVehiclePanel] = useState(false); //opens vehicle panel
  const [confirmRidePanel, setConfirmRidePanel] = useState(false); 
  const [rideConfirmation, setRideConfirmation] = useState(false); 
  const [formData, setFormData] = useState({
    pickup: '',
    destination: '',
  });

  const confirmRidePanelRef = useRef(null); 
  const vehiclelocationPanelRef = useRef(null); 
  const locationPanelRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.getBoundingClientRect().height;
      setDivHeight(height);
    }
  });

  const panelHeight = window.innerHeight - divHeight;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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
        ease: "power4.easeInOut"
      });
    } else {
      gsap.to(locationPanelRef.current, {
        height: 0,
        duration: 0.3,
      });
    }
  }, [locationPanelOpen]);

  useGSAP(() => {
    if(vehiclePanel){
      gsap.to(vehiclelocationPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclelocationPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanel]);  

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform:'translateY(0%)', 
        duration: 0.3,
        ease: "power4.easeInOut"
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform:'translateY(100%)',
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
      <div className="h-screen w-screen">
        <img
          className="bg-cover h-full w-full object-cover"
          src="https://images.squarespace-cdn.com/content/v1/54ff63f0e4b0bafce6932642/1613585187225-CJE61PHC7ZYVEXYYVWBK/Lyft%27s+Map+vs+Uber%27s+Map.png"
          alt="Map Background"
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div ref={containerRef} className="h-auto bg-white flex flex-col justify-end p-5 relative">
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 items-center relative"
          >
            <div className="absolute left-8 top-1/2 transform -translate-y-1/2 h-20 w-0.5 bg-gray-400"></div>
            {/* Pickup Input with Icon */}
            <div className="relative flex items-center w-full">
              <MapPin
                className="absolute left-4 text-gray-600  mt-4"
                size={20}
              />
              <input
                onClick={() => setLocationPanelOpen(true)}
                onChange={handleChange}
                name="pickup"
                value={pickup}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4 p-5"
                type="text"
                placeholder="Add a pick-up location"
              />
            </div>

            <div className="relative flex items-center w-full">
              <Navigation
                className="absolute left-4 text-gray-600  mb-4"
                size={20}
              />
              <input
                onClick={() => setLocationPanelOpen(true)}
                onChange={handleChange}
                name="destination"
                value={destination}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mb-4 p-5"
                type="text"
                placeholder="Enter your destination"
              />
            </div>
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
        <div
          ref={locationPanelRef}
          className="bg-blue-500 ">
            <LocationSearchPanel  setLocationPanelOpen={setLocationPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      <div ref={vehiclelocationPanelRef} className='fixed bottom-0 p-5 translate-y-full w-full bg-white'>
        <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed bottom-0 w-full'>
        <ConfirmRidePanel rideConfirmation={rideConfirmation} setRideConfirmation={setRideConfirmation} setConfirmRidePanel={setConfirmRidePanel}/>
      </div>
    </div>
  );
};

export default Home;
