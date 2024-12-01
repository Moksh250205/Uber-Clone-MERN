import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const navigate = useNavigate(); 

    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/captain/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status == 200) {
                    localStorage.removeItem('token');
                    navigate('/captain-login')
                }

            } catch (error) {
                console.log('Error logging out', error);
            }
        }

        logout(); 
    }, [navigate]); 

    return (
        <div>captainLogout</div>
    )
}

export default CaptainLogout