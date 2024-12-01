import React from 'react';
import { MapPin } from 'lucide-react';

const LocationSearchPanel = ({ setVehiclePanel, setLocationPanelOpen}) => {
  const locations = [
    'New York, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'San Francisco, CA',
  ];

  return (
    <div className="p-4 bg-white shadow-md">
      <ul className="space-y-3">
        {locations.map((location, key) => (
            <li key={key} onClick={(() => {
                setVehiclePanel(true);
                setLocationPanelOpen(false); 
            })} className='flex items-center gap-3 bg-white p-5 rounded-md hover:bg-gray-50 cursor-pointer'>
                <MapPin className="text-black" size={20} />
                <span className='text-gray-800'>{location}</span> 
            </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearchPanel;