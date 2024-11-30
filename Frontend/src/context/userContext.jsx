import React, { createContext, useState } from 'react'

export const userDataContext = createContext()

const userContext = ({children}) =>  {

  const [user, setUser] = useState({
    email:'',
    full_name:{
        first_name:'', 
        last_name:'', 
    }
  }); 
  return (
    <div>
        <userDataContext.Provider value={{user, setUser}}>
            {children}
        </userDataContext.Provider>
    </div>
  )
}

export default userContext