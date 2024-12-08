import { MapPin, WalletCards, ChevronDown } from 'lucide-react'
import React from 'react'

const ConfirmRidePanel = ({ setConfirmRidePanel, rideConfirmation, setRideConfirmation, vehicleUrl, destination, pickup, vehicleType, fare, createRide }) => {
    console.log(vehicleType, fare)
    return (
        <div className='bg-white pt-2'>
            <ChevronDown onClick={() => {
                setConfirmRidePanel(false);
            }} size={35} className='text-gray-400 top-3 justify-self-center'/>
            {rideConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
                    <p className="text-white text-xl font-semibold mb-6 animate-pulse">Looking for rides...</p>
                </div>
            )}
            <h5 className='p-1 text-center'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl text-center font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src={vehicleUrl} alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin />
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin />
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <WalletCards />
                        <div>
                            <h3 className='text-lg font-medium'>₹{fare[vehicleType]}</h3>
                            <p className='text-base -mt-1 text-gray-600'>UPI / Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    setRideConfirmation(true);
                    createRide(); 
                }} className='w-10/12 m-5 bg-black text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRidePanel