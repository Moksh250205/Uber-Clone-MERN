import { MapPin, MapPinCheck, WalletCards } from 'lucide-react'
import React from 'react'

const WaitingForDriver = ({ride, otp}) => {

  if (!ride || !ride.captain) {
    return <div>Loading...</div>; // Show loading message or placeholder if ride or captain is not available
  }
  
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{ride?.captain.full_name.first_name + " " + ride.captain.full_name.last_name}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>{ride?.captain.vehicle.model}</p>
          <h1 className='text-lg font-semibold'>{otp}</h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <MapPin />
            <div>
              <h3 className='text-lg font-medium'>Pickup</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <MapPinCheck />
            <div>
              <h3 className='text-lg font-medium'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <WalletCards />
            <div>
              <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>UPI / Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver