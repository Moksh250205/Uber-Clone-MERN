const paymentService = require('../services/payment.service');

exports.createCheckoutSession = async (req, res) => {
    try {
        const { rideId } = req.body;
        const user = req.user;

        const result = await paymentService.createCheckoutSession(user, rideId);

        res.status(200).json({
            success: true,
            data: {
                sessionId: result.sessionId
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.confirmPayment = async (req, res) => {
    try {
        const { rideId } = req.body;
        const user = req.user;

        const ride = await paymentService.confirmPayment(user, rideId);

        res.status(200).json({
            success: true,
            message: 'Payment successful',
            data: ride
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
