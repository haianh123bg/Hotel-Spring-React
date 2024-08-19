import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import HomePage from './components/home/HomePage';
import AllRoomsPage from './components/booking_rooms/AllRoomsPage';
import FindBookingPage from './components/booking_rooms/FindBookingPage';
import RoomDetailsPage from './components/booking_rooms/RoomDetailsPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import { AdminRoute, ProtectedRoute } from './service/guard';
import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';
import AdminPage from './components/admin/AdminPage';
import ManageRoomPage from './components/admin/ManageRoomPage';
import EditRoomPage from './components/admin/EditRoomPage';
import AddRoomPage from './components/admin/AddRoomPage';
import ManageBookingsPage from './components/admin/ManageBookingsPage';
import EditBookingPage from './components/admin/EditBookingPage';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/rooms" element={<AllRoomsPage />} />
                        <Route path="/find-booking" element={<FindBookingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        <Route
                            path="/room-details-book/:roomId"
                            element={<ProtectedRoute element={RoomDetailsPage} />}
                        />
                        <Route path="/profile" element={<ProtectedRoute element={ProfilePage} />} />
                        <Route path="/edit-profile" element={<ProtectedRoute element={EditProfilePage} />} />

                        <Route path="/admin" element={<AdminRoute element={AdminPage} />} />
                        <Route path="/admin/manage-rooms" element={<AdminRoute element={ManageRoomPage} />} />
                        <Route path="/admin/edit-room/:roomId" element={<AdminRoute element={EditRoomPage} />} />
                        <Route path="/admin/add-room" element={<AdminRoute element={AddRoomPage} />} />
                        <Route path="/admin/manage-bookings" element={<AdminRoute element={ManageBookingsPage} />} />
                        <Route
                            path="/admin/edit-booking/:bookingCode"
                            element={<AdminRoute element={EditBookingPage} />}
                        />

                        {/* Fallback Route */}
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
