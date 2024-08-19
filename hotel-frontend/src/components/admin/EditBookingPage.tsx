import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService'; // Assuming your service is in a file called ApiService.js

interface User {
    name: string;
    email: string;
    phoneNumber: string;
}

interface Room {
    roomType: string;
    roomPrice: number;
    roomDescription: string;
    roomPhotoUrl: string;
}

interface Booking {
    id: string;
    bookingConfirmationCode: string;
    checkInDate: string;
    checkOutDate: string;
    numOfAdults: number;
    numOfChildren: number;
    guestEmail: string;
    user: User;
    room: Room;
}

const EditBookingPage: React.FC = () => {
    const navigate = useNavigate();
    const { bookingCode } = useParams<{ bookingCode: string }>();
    const [bookingDetails, setBookingDetails] = useState<Booking | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await ApiService.getBookingByConfirmationCode(bookingCode!);
                if (response && response.booking) {
                    setBookingDetails(response.booking);
                } else {
                    setError('Booking details not found.');
                }
            } catch (error: any) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchBookingDetails();
    }, [bookingCode]);

    const achieveBooking = async (bookingId: string) => {
        if (!window.confirm('Are you sure you want to Achieve this booking?')) {
            return;
        }

        try {
            const response = await ApiService.cancelBooking(bookingId);
            if (response.statusCode === 200) {
                setSuccessMessage('The booking was Successfully Achieved');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/admin/manage-bookings');
                }, 3000);
            }
        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!bookingDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="find-booking-page">
            <h2>Booking Detail</h2>
            {success && <p className="success-message">{success}</p>}
            <div className="booking-details">
                <h3>Booking Details</h3>
                <p>Confirmation Code: {bookingDetails.bookingConfirmationCode}</p>
                <p>Check-in Date: {bookingDetails.checkInDate}</p>
                <p>Check-out Date: {bookingDetails.checkOutDate}</p>
                <p>Num Of Adults: {bookingDetails.numOfAdults}</p>
                <p>Num Of Children: {bookingDetails.numOfChildren}</p>
                <p>Guest Email: {bookingDetails.guestEmail}</p>

                <br />
                <hr />
                <br />
                <h3>Booker Details</h3>
                <div>
                    <p> Name: {bookingDetails.user?.name}</p>
                    <p> Email: {bookingDetails.user?.email}</p>
                    <p> Phone Number: {bookingDetails.user.phoneNumber}</p>
                </div>

                <br />
                <hr />
                <br />
                <h3>Room Details</h3>
                <div>
                    <p> Room Type: {bookingDetails.room.roomType}</p>
                    <p> Room Price: ${bookingDetails.room.roomPrice}</p>
                    <p> Room Description: {bookingDetails.room.roomDescription}</p>
                    <img src={bookingDetails.room.roomPhotoUrl} alt="Room" />
                </div>
                <button className="achieve-booking" onClick={() => achieveBooking(bookingDetails.id)}>
                    Achieve Booking
                </button>
            </div>
        </div>
    );
};

export default EditBookingPage;
