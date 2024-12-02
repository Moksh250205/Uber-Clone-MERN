import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import UserLogin from './pages/userLogin'
import UserSignup from './pages/userSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'
import Opening from './pages/Opening'
import UserProtectWrapper from './guards/userProtectWrapper'
import UserLogout from './pages/userLogout'
import CaptainLogout from './pages/captainLogout'
import CaptainProtectWrapper from './guards/captainProtectWrapper'
import CaptainHome from './pages/captainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Opening/>}/>
        <Route path='/login' element={<UserLogin />}/>
        <Route path='/signup' element={<UserSignup />}/>
        <Route path='/captain-login' element={<CaptainLogin />}/>
        <Route path='/captain-signup' element={<CaptainSignup />}/>

        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }/> 

        <Route path='user-logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />

        <Route path='/riding' element={
          <UserProtectWrapper >
            <Riding />
          </UserProtectWrapper>
        }/>

        <Route path='/captain-logout' element={
          <UserProtectWrapper>
            <CaptainLogout />
          </UserProtectWrapper>
        }/>
        
        <Route path='/captain-home' element={
          <CaptainProtectWrapper path={'/captain-home'}>
            <CaptainHome />
          </CaptainProtectWrapper>
        }></Route>

        <Route path='/captain-riding' element={
          <CaptainProtectWrapper path={'/captain-riding'}>
            <CaptainRiding />
          </CaptainProtectWrapper>
        }></Route>

      </Routes>
    </div>
  )
}

export default App