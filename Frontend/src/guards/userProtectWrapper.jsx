import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const userProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token'); 
    const navigate = useNavigate(); 
    useEffect(() =>{
        if(!token){
            const getUser = async () => {
                const checkValid = axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }); 
                if(checkValid.status == 200){
                    navigate('/home');
                }
                else{
                    navigate('/login'); 
                }
            }

            getUser(); 
        } 
    },[token]); 

    return (
        <div>{children}</div>
    )
}

export default userProtectWrapper; 