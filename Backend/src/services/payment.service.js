const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const rideModel = require('../models/ride.model');

exports.createCheckoutSession = async (user, rideId) => {
    const ride = await rideModel.findOne({
        _id: rideId,
        user: user._id,
        paymentStatus: 'pending'
    });

    if (!ride) {
        throw new Error('Ride not found or already paid');
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: `Ride to ${ride.destination}`,
                    },
                    unit_amount: Math.round(ride.fare * 100),
                },
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/payment/success?rideId=${rideId}`,
        cancel_url: `${process.env.FRONTEND_URL}/payment/cancel?rideId=${rideId}`,
        client_reference_id: rideId,
        metadata: {
            rideId: rideId,
            userId: user._id.toString()
        }
    });

    ride.paymentIntentId = session.id;
    await ride.save();

    return {
        sessionId: session.id
    };
};

exports.confirmPayment = async (user, rideId) => {
    const ride = await rideModel.findOne({
        _id: rideId,
        user: user._id,
    });

    if (!ride) {
        throw new Error('Ride not found');
    }

    ride.paymentStatus = 'completed';
    ride.paymentID = ride.paymentIntentId;
    ride.orderId = ride.paymentIntentId;
    await ride.save();

    return ride;
};
