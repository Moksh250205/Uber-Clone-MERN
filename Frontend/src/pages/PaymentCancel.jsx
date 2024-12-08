import { useLocation } from 'react-router-dom';

const PaymentCancel = () => {
    const location = useLocation();
    const rideId = new URLSearchParams(location.search).get('rideId');

    return (
        <div>
            <h1>Payment Cancelled</h1>
            <p>Your payment for ride {rideId} was not completed. Please try again.</p>
        </div>
    );
};

export default PaymentCancel;
