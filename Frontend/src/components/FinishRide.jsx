import axios from 'axios';
import { ChevronDown, MapPin, MapPinCheck, WalletCardsIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FinishRide = ({ setFinishRidePanel, ride }) => {
    const navigate = useNavigate();
    const [ongoingRide, setOngoingRide] = useState(ride);  

    useEffect(() => {
        if (ride) {
            localStorage.setItem('ongoingRideCaptain', JSON.stringify(ride));
            setOngoingRide(ride);
        } else {
            const storedOngoingRide = JSON.parse(localStorage.getItem('ongoingRideCaptain'));
            if (storedOngoingRide) {
                setOngoingRide(storedOngoingRide);
            } else {
                console.error('No ongoing ride found in localStorage');
            }
        }
    }, [ride]);  

    const distance = ongoingRide?.distance / 1000; // Convert distance from meters to kilometers

    const endRide = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/ride/end-ride`, {
                params: { rideId: ongoingRide._id }, 
                headers: { Authorization: `Bearer ${localStorage.getItem('captainToken')}` }
            });

            if (response.data.success) {
                localStorage.removeItem('ongoingRideCaptain');
                
                navigate('/captain-home'); 
            } else {
                console.error('Error finishing the ride:', response.data.message);
            }
        } catch (error) {
            console.error("Error finishing the ride:", error);
        }
    };

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0 justify-center flex'>
                <ChevronDown className='mt-3' size={30} onClick={() => setFinishRidePanel(false)}/> 
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            <div className='flex items-center justify-between p-4 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 rounded-full object-cover w-12' 
                        src={ongoingRide?.user?.profileImage || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"} 
                        alt="User Profile" />
                    <h2 className='text-lg font-medium'>{ongoingRide?.user?.full_name?.first_name}</h2>
                </div>
                <h5 className='text-lg font-semibold'>{distance}</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin />
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ongoingRide?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPinCheck />
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ongoingRide?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <WalletCardsIcon />
                        <div>
                            <h3 className='text-lg font-medium'>₹{ongoingRide?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>UPI / Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 w-full'>
                    <button onClick={() => {
                        setFinishRidePanel(false); 
                        endRide(); // Corrected to call the endRide function
                    }}
                        className='w-full mt-5 flex text-lg justify-center bg-black text-white font-semibold p-3 rounded-lg'>
                        Finish Ride
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FinishRide;
