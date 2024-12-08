import React, { createContext, useEffect, useState } from 'react'

export const captainDataContext = createContext(); 

const CaptainContext = ({children}) => {

  const storedCaptain = localStorage.getItem('captain');
  const initialCaptain = storedCaptain ? JSON.parse(storedCaptain) : null;

  const [captain, setCaptain] = useState(initialCaptain);
  
  useEffect(() => {
    if (captain) {
      localStorage.setItem('captain', JSON.stringify(captain));
    }
  }, [captain]);

  return (
    <div>
        <captainDataContext.Provider value={{captain, setCaptain}}>
            {children}
        </captainDataContext.Provider>
    </div>
  )
}

export default CaptainContext