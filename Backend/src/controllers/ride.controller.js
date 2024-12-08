const { sendMessageToSocketId } = require('../../socket');
const rideModel = require('../models/ride.model');
const rideService = require('../services/ride.service');

exports.createRideController = async (req, res) => {
    try {
        const user = req.user;
        const { pickup, destination, vehicleType, fare, duration, distance } = req.body;

        const response = await rideService.createRide(user, pickup, destination, vehicleType, fare, distance , duration);

        res.status(201).json({
            success: true,
            message: "Ride created successfully",
            data: response.ride,
        });

        const captains = response.captains;
        response.ride.otp = ''; 

        const userDataWithRide = await rideModel.findOne({ _id: response.ride._id }).populate('user');

        captains.map((captain) => {
            try {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: userDataWithRide,
                });
            } catch (socketError) {
                console.error(`Error notifying captain: ${captain.id}`, socketError);
            }
        });

    } catch (error) {
        console.error(error); 
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getFareController = async (req, res) => {
    try {
        const userTravelData = req.query;  
        
        const { fare, distanceTime } = await rideService.getFare(userTravelData);

        res.status(200).json({
            success: true,
            message: "Fare calculated successfully",
            data: {
                fare,
                distanceTime,  
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

exports.confirmRideController = async (req, res) => {
    const {rideId} = req.body; 

    try {
        const ride = await rideService.confirmRide(rideId, req.captain._id); 

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed', 
            data: ride
        })

        res.status(200).json({
            success: true,
            message: 'Ride Confirmed',
            data: rideData
        });  
    } catch (error) {
        console.log(error); 
        res.status(400).json({error: error}); 
    }
}

exports.startRideController = async (req, res) => {
    const rideData = req.query; 
    const captainId = req.captain._id;  
    try {
        const ride = await rideService.startRide(rideData, captainId); 

        
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started', 
            data: ride
        });

        return res.status(200).json({data: ride, message: 'Ride started', 
            success: true
        }); 

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}

exports.endRideController = async (req, res) => {
    const rideData = req.query; 
    const captainId = req.captain._id; 
    console.log(rideData, captainId); 
    try {
        const ride = await rideService.endRide(rideData, captainId);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended', 
            data: ride
        });

        return res.status(200).json({data: ride, message: 'Ride started', 
            success: true
        }); 

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}