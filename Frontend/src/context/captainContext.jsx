import React, { createContext, useState } from 'react'

export const captainDataContext = createContext(); 

const CaptainContext = ({children}) => {

    const [captain, setCaptain] = useState({
        full_name: {
          first_name: '',
          last_name: ''
        },
        vehicle: {
          color: '',
          plate: '',
          capacity: 0,
          vehicleType: '',
          model: ''
        },
        _id: '',
        email: '',
        contact_number: '',
        socketId: null,
        status: '',
        __v: 0
      });

  return (
    <div>
        <captainDataContext.Provider value={{captain, setCaptain}}>
            {children}
        </captainDataContext.Provider>
    </div>
  )
}

export default CaptainContext