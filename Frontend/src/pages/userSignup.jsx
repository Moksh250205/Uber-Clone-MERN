import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/userContext';
import axios from 'axios'; 

const UserSignup = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(userDataContext);  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, formData); 
      setUser(response.data.user); 
      localStorage.setItem('token', response.data.token); 
      navigate('/'); 
    } catch (error) {
      console.error('Error during registration:', error);
    } 

    setFormData({
      first_name: '', 
      last_name:'', 
      email:'', 
      password:''
    })
  }

  const {first_name, last_name, email, password} = formData

  return (
    <div className="p-7 h-screen w-screen flex justify-between flex-col">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form action="" onSubmit={handleSubmit}>
          {/* First and Last Name Fields */}
          <div className="flex gap-4 mb-7">
            <div className="flex-1">
              <h3 className="text-xl mb-2">First Name</h3>
              <input
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                required
                placeholder="First Name"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl mb-2">Last Name</h3>
              <input
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                required
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email Field */}
          <h3 className="text-xl mb-2">What's your email</h3>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            placeholder="email@example.com"
          />

          {/* Password Field */}
          <h3 className="text-xl mb-2">Enter Password</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            required
            placeholder="Password"
          />

          {/* Submit Button */}
          <button className="bg-[#111] text-gray-200 rounded px-4 py-2 w-full text-lg placeholder:text-base">
            Sign Up
          </button>
        </form>

        {/* Sign-in Link */}
        <div className="flex justify-center mb-5">
          <h3>Already have an account?</h3>
          <Link to='/login' className="text-green-500 pl-1 font-semibold">
            Login
          </Link>
        </div>
      </div>

      {/* Sign in as user */}
      <div className="flex justify-center w-full">
        <Link
          to="/captain-signup"
          className="bg-[#111] text-center text-gray-200 mb-7 w-full rounded px-4 py-2 text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserSignup;
