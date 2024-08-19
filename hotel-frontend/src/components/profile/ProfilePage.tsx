import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

interface Room {
    roomType: string;
    roomPhotoUrl: string;
}

interface Booking {
    id: string;
    bookingConfirmationCode: string;
    checkInDate: string;
    checkOutDate: string;
    totalNumOfGuest: number;
    room: Room;
}

interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    bookings: Booking[];
}

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                // Fetch user bookings using the fetched user ID
                const userPlusBookings = await ApiService.getUserBookings(response.user.id);
                setUser(userPlusBookings.user as User);
            } catch (error: any) {
                setError(error.response?.data?.message || error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        ApiService.logout();
        navigate('/home');
    };

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    return (
        <div className="profile-page">
            {user && <h2>Welcome, {user.name}</h2>}
            <div className="profile-actions">
                <button className="edit-profile-button" onClick={handleEditProfile}>
                    Edit Profile
                </button>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {user && (
                <div className="profile-details">
                    <h3>My Profile Details</h3>
                    <p>
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone Number:</strong> {user.phoneNumber}
                    </p>
                </div>
            )}
            <div className="bookings-section">
                <h3>My Booking History</h3>
                <div className="booking-list">
                    {user && user.bookings.length > 0 ? (
                        user.bookings.map((booking) => (
                            <div key={booking.id} className="booking-item">
                                <p>
                                    <strong>Booking Code:</strong> {booking.bookingConfirmationCode}
                                </p>
                                <p>
                                    <strong>Check-in Date:</strong> {booking.checkInDate}
                                </p>
                                <p>
                                    <strong>Check-out Date:</strong> {booking.checkOutDate}
                                </p>
                                <p>
                                    <strong>Total Guests:</strong> {booking.totalNumOfGuest}
                                </p>
                                <p>
                                    <strong>Room Type:</strong> {booking.room.roomType}
                                </p>
                                <img src={booking.room.roomPhotoUrl} alt="Room" className="room-photo" />
                            </div>
                        ))
                    ) : (
                        <p>No bookings found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
