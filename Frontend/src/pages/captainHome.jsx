import React, { useState, useRef, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUpPanel from '../components/ridePopupPanel'
import ConfirmRidePopupPanel from '../components/ConfirmRidePopupPanel'
import { captainDataContext } from '../context/captainContext'
import { SocketContext } from '../context/socketContext'
import axios from 'axios'



const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [ride, setRide] = useState({});

  const ridePopupPanelref = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);

  const { captain } = useContext(captainDataContext);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit('join', { userType: 'captain', userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-captain-location', {
            captainId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    }
    const locationInterval = setInterval(() => {
      updateLocation();
    }, 15000);
    updateLocation();
  }, []);

  useEffect(() => {
    socket.on('new-ride', (data) => {
      setRide(data);
      setRidePopupPanel(true);
    })
  })

  async function confirmRide() {

    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/ride/confirm-ride`, {

      rideId: ride._id,
      captainId: captain._id,


    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('captainToken')}`
      }
    })

    setRidePopupPanel(false)
    setConfirmRidePopupPanel(true)
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelref.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ridePopupPanelref.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel]);



  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelref} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUpPanel
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>
      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopupPanel setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} ride={ride} setRide={setRide}/>
      </div>
    </div>
  )
}

export default CaptainHome