import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import RouteTracking from "../components/RouteTracking";
import { Home, MapPin, MapPinCheck } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"; 

const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLIC_KEY}`);

const Riding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [ride, setRide] = useState(null);
  const [vehicleUrl, setVehicleUrl] = useState("");

  useEffect(() => {

    if (location.state && location.state.ride) {
      localStorage.setItem('ongoingRideClient', JSON.stringify(location.state.ride));
      setRide(location.state.ride);
      setVehicleUrl(location.state.vehicleUrl || "");
    } else {
      const storedRide = JSON.parse(localStorage.getItem('ongoingRideClient'));
      if (storedRide) {
        setRide(storedRide);
      } else {
        navigate("/home");
      }
    }
  }, [location.state, navigate, socket]);


  const convertDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ${minutes % 60} minute${minutes % 60 !== 1 ? "s" : ""}`;
    }
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  };

  const convertDistance = (meters) => {
    return (meters / 1000).toFixed(2) + " km";
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payment/checkout`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        const stripe = await stripePromise;
        const { sessionId } = response.data.data;

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (error) {
          setPaymentError(error.message);
        }
      } else {
        setPaymentError(response.data.message);
      }
    } catch (error) {
      setPaymentError("Payment initiation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!ride) {
    return <div>Loading ride details...</div>;
  }

  return (
    <div className="h-screen flex flex-col relative">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-transparent flex items-center justify-center rounded-full"
      >
        <Home />
      </Link>

      <div className="flex-grow">
        <RouteTracking destinationAddress={ride.destination} caller={"user"} />
      </div>

      <div className="bg-white shadow-lg p-4 w-full">
        <div className="flex items-center justify-between mb-3">
          <img className="h-12" src={vehicleUrl} alt="" />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride.captain.full_name.first_name}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">{ride.captain.vehicle.model}</p>
          </div>
        </div>

        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-b">
            <MapPin />
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <MapPinCheck />
            <div>
              <h3 className="text-lg font-medium">₹{ride.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">UPI / Cash</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-t">
            <MapPin />
            <div>
              <h3 className="text-lg font-medium">Distance</h3>
              <p className="text-sm -mt-1 text-gray-600">{convertDistance(ride.distance)}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-t">
            <MapPin />
            <div>
              <h3 className="text-lg font-medium">Duration</h3>
              <p className="text-sm -mt-1 text-gray-600">{convertDuration(ride.duration)}</p>
            </div>
          </div>
        </div>

        <button
          className="w-full mt-4 bg-black text-white font-semibold p-2 rounded-lg"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing Payment..." : "Make a Payment"}
        </button>

        {paymentError && (
          <div className="mt-2 text-red-600 text-center">
            {paymentError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Riding;