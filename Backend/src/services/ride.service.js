const mapService = require("../services/map.service");
const rideModel = require('../models/ride.model'); 
const crypto = require("crypto"); 


exports.createRide = async (user, pickup, destination, vehicleType, fare, distance, duration) => {
    if (!user || !pickup || !destination || !vehicleType || !fare || !distance || !duration ) {
        throw new Error('All fields are required');
    }

    const coordinates = await mapService.getAddressCoordinate(pickup);

    const captains = await mapService.getCaptainInTheRadius(coordinates.ltd, coordinates.lng, 3); 
    const otp = getOtp(6); 

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        distance, 
        duration, 
        otp,
        fare: fare[ vehicleType ]
    })

    console.log(ride); 

    return {ride, captains};
}

exports.getFare = async (userTravelData) => {
    const { pickup, destination } = userTravelData;

    if (!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    const baseFare = {
        Auto: 30,
        Hatchback: 40,
        Sedan: 45,
        SUV: 50,
        Moto: 20,
    };

    const perKmRate = {
        Auto: 10,
        Hatchback: 12,
        Sedan: 15,
        SUV: 20,
        Moto: 8,
    };

    const perMinuteRate = {
        Auto: 2,
        Hatchback: 2.5,
        Sedan: 3,
        SUV: 4,
        Moto: 1.5,
    };

    const fare = {
        Auto: Math.round(
            baseFare.Auto +
            (distanceTime.distance.value / 1000) * perKmRate.Auto +
            (distanceTime.duration.value / 60) * perMinuteRate.Auto
        ),
        Hatchback: Math.round(
            baseFare.Hatchback +
            (distanceTime.distance.value / 1000) * perKmRate.Hatchback +
            (distanceTime.duration.value / 60) * perMinuteRate.Hatchback
        ),
        Sedan: Math.round(
            baseFare.Sedan +
            (distanceTime.distance.value / 1000) * perKmRate.Sedan +
            (distanceTime.duration.value / 60) * perMinuteRate.Sedan
        ),
        SUV: Math.round(
            baseFare.SUV +
            (distanceTime.distance.value / 1000) * perKmRate.SUV +
            (distanceTime.duration.value / 60) * perMinuteRate.SUV
        ),
        Moto: Math.round(
            baseFare.Moto +
            (distanceTime.distance.value / 1000) * perKmRate.Moto +
            (distanceTime.duration.value / 60) * perMinuteRate.Moto
        ),
    };

    return {
        fare,
        distanceTime: {
            distance: distanceTime.distance,
            duration: distanceTime.duration,
        }
    };
};

function getOtp(num) {
    function generateOtp(num) {
        return crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    }
    return generateOtp(num);
}

exports.confirmRide = async (rideId, captainId) => {
    if (!rideId || !captainId) { 
        throw new Error('All fields are required'); 
    }

    const ride = await rideModel
        .findOneAndUpdate(
            { _id: rideId, status: 'pending' }, 
            { status: 'accepted', captain: captainId }, 
            { new: true } 
        ).populate('user').populate('captain'); 

    if (!ride) {
        throw new Error('Ride not found or not in a pending state');
    }

    return ride;
};


exports.startRide = async (rideData, captainId) => {
    const { rideId, otp } = rideData;

    if (!rideId || !otp || !captainId) {
        throw new Error('RideId, otp, and captainId are required');
    }

    const ride = await rideModel
        .findById(rideId)
        .populate('user')
        .populate('captain')
        .select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.captain._id.toString() !== captainId) {
        throw new Error('Unauthorized: Captain mismatch');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    ride.status = 'ongoing';
    await ride.save();

    return ride;
};

exports.endRide = async (rideData, captainId) => {
    const { rideId } = rideData;

    if (!rideId || !captainId) {
        throw new Error('RideId and captainId are required');
    }

    const ride = await rideModel.findById(rideId).populate('user').populate('captain');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.captain._id.toString() !== captainId) {
        throw new Error('Unauthorized: Captain mismatch');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Cannot complete ride: Ride is not ongoing');
    }

    ride.status = 'completed';
    await ride.save();

    return ride;
};


