import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainSignup = () => {

  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    contact_number: '',
    email: '',
    password: '',
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: '',
      model: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('vehicle.')) {
      const vehicleField = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        vehicle: {
          ...prevFormData.vehicle,
          [vehicleField]: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/captain/register`, formData);
      console.log(response.data.captain);
      navigate('/');
    } catch (error) {
      console.error(error); 
    }
  }

    const { first_name, last_name, email, password, contact_number, vehicle } = formData;

    return (
      <div className="p-7 h-screen w-screen flex justify-between flex-col">
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div>
          <h2 className="text-2xl font-bold mb-6">Captain Signup</h2>
          <form onSubmit={handleSubmit}>
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
            <h3 className="text-xl mb-2">Email</h3>
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
            <h3 className="text-xl mb-2">Password</h3>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              placeholder="Password"
            />

            {/* Contact Number Field */}
            <h3 className="text-xl mb-2">Contact Number</h3>
            <input
              type="tel"
              name="contact_number"
              value={contact_number}
              onChange={handleChange}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              placeholder="Contact Number"
            />

            {/* Vehicle Details */}
            <h3 className="text-xl mb-2">Vehicle Details</h3>
            <div className="grid grid-cols gap-4 mb-7">
              <div>
                <input
                  type="text"
                  name="vehicle.color"
                  value={vehicle.color}
                  onChange={handleChange}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  placeholder="Vehicle Color"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="vehicle.plate"
                  value={vehicle.plate}
                  onChange={handleChange}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  placeholder="License Plate"
                />
              </div>
              <div>
                <input
                  type="number"
                  name="vehicle.capacity"
                  value={vehicle.capacity}
                  onChange={handleChange}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  placeholder="Capacity"
                />
              </div>
              <div>
                <select
                  name="vehicle.vehicleType"
                  value={vehicle.vehicleType}
                  onChange={handleChange}
                  className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                >
                  <option value="">Vehicle Type</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            </div>
            <input
              type="text"
              name="vehicle.model"
              value={vehicle.model}
              onChange={handleChange}
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              required
              placeholder="Vehicle Model"
            />

            {/* Submit Button */}
            <button type='submit' className="bg-[#111] mb-1 text-gray-200 rounded px-4 py-2 w-full text-lg">
              Sign Up
            </button>
            <div className='flex justify-center text-lg mb-5 gap-1'>
              <div>Already a captain?</div>
              <Link to={'/captain-login'} className='text-green-500 font-semibold'> Log in here</Link>
            </div>
          </form>
          <div className='w-full flex justify-center text-lg py-5'>
            <Link className='w-full bg-black text-center text-white rounded p-2' to={'/signup'}>Signin as user</Link>
          </div>
        </div>
      </div>
    );
  };

export default CaptainSignup;
