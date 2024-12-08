import React from 'react';
import { ChevronDown, User } from 'lucide-react';
import HatchBack from '../assets/uber-3d-suv-3d-model-b3b22979a3-removebg-preview.png';

const VehiclePanel = ({ setConfirmRidePanel, setVehiclePanel, fare, setVehicleType, setVehicleUrl }) => {
  return (
    <div className="overflow-auto">
      <ChevronDown
        onClick={() => setVehiclePanel(false)}
        size={35}
        className="text-gray-400 mb-5 mx-auto cursor-pointer"
      />
      <h3 className="text-2xl font-semibold mb-5 text-center">Choose a Vehicle</h3>

      {/* Vehicles */}
      {[
        {
          type: 'Sedan',
          img: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
          capacity: 4,
          time: '2 mins away',
          desc: 'Affordable, compact rides',
          price: fare.Sedan,
        },
        {
          type: 'Moto',
          img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
          capacity: 1,
          time: '3 mins away',
          desc: 'Affordable motorcycle rides',
          price: fare.Moto,
        },
        {
          type: 'Auto',
          img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
          capacity: 3,
          time: '3 mins away',
          desc: 'Affordable Auto rides',
          price: fare.Auto,
        },
        {
          type: 'Hatchback',
          img: HatchBack,
          capacity: 5,
          time: '4 mins away',
          desc: 'Comfortable city hatchback',
          price: fare.Hatchback,
        },
        {
          type: 'SUV',
          img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1569352630/assets/4b/28f11e-c97b-495a-bac1-171ae9b29362/original/BlackSUV.png',
          capacity: 6,
          time: '5 mins away',
          desc: 'Spacious and comfortable',
          price: fare.SUV,
        },
      ].map((vehicle, index) => (
        <div
          key={index}
          onClick={() => {
            setConfirmRidePanel(true);
            setVehiclePanel(false);
            setVehicleType(vehicle.type); 
            setVehicleUrl(vehicle.img); 
          }}
          className="flex items-center border-[1px] border-gray-300 hover:border-black rounded-xl mb-4 p-3 cursor-pointer"
        >
          <img className="h-12 w-16 object-cover rounded-lg" src={vehicle.img} alt={vehicle.type} />
          <div className="ml-4 flex-1 w-full">
            <h4 className="font-medium text-base flex items-center justify-between">
              {vehicle.type}{' '}
            </h4>
            <h5 className="font-medium text-sm text-gray-500">{vehicle.time}</h5>
            <p className="font-normal text-xs text-gray-600">{vehicle.desc}</p>
          </div>
          <div>
            <span className="text-base text-gray-500 flex align-center justify-center">
              {vehicle.capacity}<User size={22}/>
            </span>
            <h2 className="text-lg font-semibold">₹{vehicle.price}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehiclePanel;
