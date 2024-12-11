import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import FinishRide from '../components/FinishRide';
import RouteTracking from '../components/RouteTracking';

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);

    const location = useLocation();
    const ride  = location.state || {};

    if (!ride) {
        return <div>Loading ride details...</div>;
    }

    const convertDuration = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${minutes % 60} minute${minutes % 60 !== 1 ? 's' : ''}`;
        }
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    };

    const convertDistance = (meters) => {
        return (meters / 1000).toFixed(2) + ' km';
    };

    return (
        <div className="h-screen relative flex flex-col justify-end">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img
                    className="w-16"
                    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                    alt="Uber Logo"
                />
                <Link
                    to="/captain-home"
                    className="h-10 w-10 bg-white flex items-center justify-center rounded-full"
                >
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>

            <div
                className="h-1/5 p-6 flex items-center justify-between relative bg-white pt-10"
                onClick={() => {
                    setFinishRidePanel(true);
                }}
            >
                <h5
                    className="p-1 text-center w-[90%] absolute top-0"
                >
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
                </h5>
                <div>
                    <h4 className="text-xl font-semibold">
                        {convertDistance(ride.distance)} away
                    </h4>
                    <p className="text-sm text-gray-600">
                        Approx. {convertDuration(ride.duration)}
                    </p>
                </div>
                <button className="bg-black text-white font-semibold p-3 px-10 rounded-lg">
                    Complete Ride
                </button>
            </div>

            <div
                ref={finishRidePanelRef}
                className={`fixed w-full z-[500] bottom-0 ${
                    finishRidePanel ? 'translate-y-0' : 'translate-y-full'
                } bg-white px-3 py-10 pt-12 transition-transform duration-300`}
            >
                <FinishRide setFinishRidePanel={setFinishRidePanel} ride={ride}/>
            </div>

            <div className='h-screen fixed w-screen top-0 z-[-1]'>
                <RouteTracking destinationAddress={ride.destination} caller={'captain'}/>
            </div>
        </div>
    );
};

export default CaptainRiding;
