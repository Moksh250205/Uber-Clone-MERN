import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapPin, MapPinCheck, WalletCards } from 'lucide-react';

const ConfirmRidePopupPanel = ({ setConfirmRidePopupPanel, ride, setRide }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const navigate = useNavigate();

  let distance = 0;
  if (ride && ride.distanceTime && ride.distanceTime.duration) {
    distance = ride.distanceTime.duration / 1000 || 0;
  }

  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1);
    if (/^\d$/.test(value) || value === '') {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < otp.length - 1) {
        e.target.nextSibling?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      e.target.previousSibling?.focus();
    }
  };

  const startRide = async () => {
    const token = localStorage.getItem('captainToken');
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ride/start-ride`, {
        params: { rideId: ride._id, otp: otp.join('') },
        headers: { Authorization: `Bearer ${token}` },
      });
      setRide(response.data);
      navigate('/captain-riding', { state: ride });
    } catch (error) {
      console.error('Error starting ride', error);
    }
  };

  useEffect(() => {
    if (!ride) {
      console.error("Ride data is not available yet.");
    }
  }, [ride]);

  return (
    <div>
      <h5 className="p-1 text-center w-[93%] absolute top-0">
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
      <div className="flex items-center justify-between p-3 border-2 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium capitalize">
            {ride?.user?.full_name?.first_name + " " + ride?.user?.full_name?.last_name}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">{distance}km</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <MapPin />
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <MapPinCheck />
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <WalletCards />
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">UPI / Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-6 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              startRide();
            }}
          >
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="bg-[#eee] w-12 h-12 text-center text-xl font-mono rounded-lg border-2 border-gray-300 focus:border-black focus:outline-none"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full mt-5 text-lg flex justify-center bg-black text-white font-semibold p-3 rounded-lg"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setConfirmRidePopupPanel(false);
              }}
              className="w-full mt-2 bg-gray-400 text-lg text-white font-semibold p-3 rounded-lg"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopupPanel;