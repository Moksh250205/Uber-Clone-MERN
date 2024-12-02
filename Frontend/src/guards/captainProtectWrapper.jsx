import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CaptainProtectWrapper = ({children, path}) => {
    const token = localStorage.getItem('captainToken'); 
    const navigate = useNavigate(); 
    console.log(token); 

    useEffect(() => {
        if(token){
            const getCaptain = async () => {
                const isValid = await axios.get(`${import.meta.env.VITE_BACKEND_U}/api/captain/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }); 
                if(isValid.status == 200){
                    navigate(path); 
                }
                else{
                    navigate('/captain-login'); 
                } 
            }
            getCaptain(); 
        }
        
    },[token]);


    return (
        <div>{children}</div>
    )
}

export default CaptainProtectWrapper