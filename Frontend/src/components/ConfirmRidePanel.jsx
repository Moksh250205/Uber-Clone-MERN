import { MapPin, WalletCards, ChevronDown } from 'lucide-react'
import React from 'react'

const ConfirmRidePanel = ({ setConfirmRidePanel, rideConfirmation, setRideConfirmation }) => {
    return (
        <div className='bg-white p-3'>
            <ChevronDown onClick={() => {
                setConfirmRidePanel(false);
            }} size={35} className='text-gray-400 top-3 justify-self-center mb-5' />
            {rideConfirmation && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
                    {/* Text */}
                    <p className="text-white text-xl font-semibold mb-6 animate-pulse">Looking for rides...</p>
                </div>
            )}
            <h5 className='p-1 text-center' ><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'></p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>nice bhai</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <WalletCards />
                        <div>
                            <h3 className='text-lg font-medium'>₹6969.69</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => {
                    setRideConfirmation(true);
                }} className='w-full mt-5 bg-black text-white font-semibold p-2 rounded-lg'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRidePanel