import React from 'react'
import { Link } from 'react-router-dom'

const Opening = () => {
  return (
    <div>
        <div className='h-screen bg-center bg-cover pt-8 flex justify-between flex-col w-full bg-[url(https://images.unsplash.com/photo-1554672408-730436b60dde?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] '>
            <img className='w-16 ml-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'>Get started with Uber</h2>
                <Link to={'/login'} className='w-full flex justify-center items-center bg-black text-white py-3 rounded mt-2' >Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Opening