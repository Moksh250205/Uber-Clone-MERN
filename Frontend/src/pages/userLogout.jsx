import React, {useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();  
    useEffect(() => {
        const logout = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status == 200) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user'); 
                    navigate('/login'); 
                }

            } catch (error) {
                console.log('Error logging out', error);
            }
        }

        logout(); 
    }, [navigate]); 

    return (
        <div>userLogout</div>
    )
}

export default UserLogout