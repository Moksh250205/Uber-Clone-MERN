import { MapPin, WalletCardsIcon } from 'lucide-react';
import React from 'react'

const RidePopUpPanel = ({setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmRide }) => {
  return (
    <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex text-white items-center justify-between p-3 bg-black rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover  w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg text-white font-medium'>{ride?.user?.full_name.first_name +  " " + ride?.user?.full_name.last_name}</h2>
                </div>
                {/* <h5 className='text-lg font-semibold'></h5> */}
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin />
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <MapPin />
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <WalletCardsIcon />
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>UPI / Cash</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 w-full '>
                    <button onClick={() => {
                        setConfirmRidePopupPanel(true)
                        setRidePopupPanel(false);
                        confirmRide()
                    }} className=' bg-black w-full text-white font-semibold p-2 px-10 rounded-lg'>Accept</button>

                    <button onClick={() => {
                        setRidePopupPanel(false);
                    }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>


                </div>
            </div>
        </div>
    )
}


export default RidePopUpPanel 