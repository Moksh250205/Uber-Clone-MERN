import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [rideDetails, setRideDetails] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const rideId = urlParams.get('rideId'); // Assuming `rideId` comes in query params.

        if (!rideId) {
            setError('Invalid payment confirmation. Missing ride ID.');
            return;
        }

        const confirmPayment = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payment/confirm`, {
                    rideId,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    console.log(response.data.data); 
                    setRideDetails(response.data.data);

                    // Set a timeout of 7 seconds before redirecting
                    setTimeout(() => {
                        // Check if the ride is completed, and redirect accordingly
                        if (response.data.data.status === 'completed') {
                            navigate('/home');  // Redirect to home page if payment is completed
                        } else {
                            navigate('/riding');  // Redirect to riding page if not completed
                        }
                    }, 7000); // 7 seconds delay
                } else {
                    throw new Error(response.data.message || 'Payment confirmation failed.');
                }
            } catch (err) {
                console.error('Error during payment confirmation:', err);
                setError(err.response?.data?.message || err.message || 'An error occurred.');
            }
        };
        confirmPayment();
    }, [location.search, navigate]);

    if (error) return <div className="flex items-center justify-center min-h-screen bg-black text-white">{`Error: ${error}`}</div>;
    if (!rideDetails) return <div className="flex items-center justify-center min-h-screen bg-black text-white">Loading...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white px-6">
            <div className="bg-white text-black rounded-lg shadow-lg p-8 max-w-sm w-full">
                <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-base mb-2">Ride to: <span className="font-semibold">{rideDetails.destination}</span></p>
                <p className="text-base mb-2">Amount Paid: <span className="font-semibold">₹{rideDetails.fare}</span></p>
                <p className="text-base flex-wrap">Payment ID: <span className="font-semibold text-wrap">{rideDetails.paymentID}</span></p>
            </div>
        </div>
    );
};

export default PaymentSuccess;
