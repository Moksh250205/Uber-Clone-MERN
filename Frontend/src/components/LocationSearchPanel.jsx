import React from 'react';
import { MapPin } from 'lucide-react';

const LocationSearchPanel = ({ suggestions, setFormData, setLocationPanelOpen, activeField }) => {
  if (!Array.isArray(suggestions)) {
    return <div className='text-center w-screen '>No suggestions available.</div>;
  }
  console.log(suggestions)

  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({
      ...prev,
      [activeField]: suggestion, // Set the appropriate field (pickup or destination)
    }));
  };

  return (
    <div className="space-y-2">
      {suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className="flex items-center gap-4 border-2 p-4 rounded-xl hover:border-black transition-all"
          >
            {/* Icon Container */}
            <div className="flex items-center justify-center bg-[#eee] h-12 w-12 rounded-full">
              <MapPin className="text-gray-600" size={20} />
            </div>
            {/* Suggestion Text */}
            <div className="flex-1">
              <h4 className="text-base font-medium text-gray-800">{elem}</h4>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-center">No suggestions available.</div>
      )}
    </div>
  );
};

export default LocationSearchPanel;
