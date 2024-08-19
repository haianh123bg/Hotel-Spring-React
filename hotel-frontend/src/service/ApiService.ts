import axios from 'axios';

export default class ApiService {
    static BASE_URL = 'http://localhost:8000';

    static getHeader() {
        const token = localStorage.getItem('token');
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    }

    // Auth
    static async registerUser(registration: any) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    // This login a registered user
    static async loginUser(loginDetails: any) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    // Users

    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUser(userId: any) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getUserBookings(userId: any) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    /* This is to delete a user */
    static async deleteUser(userId: any) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    // Room

    static async addRoom(formData: any) {
        const result = await axios.post(`${this.BASE_URL}/rooms/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return result.data;
    }

    static async getAllAvailableRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all-available-rooms`);
        return result.data;
    }

    static async getAvailableRoomsByDateAndType(checkInDate: any, checkOutDate: any, roomType: any) {
        const result = await axios.get(
            `${this.BASE_URL}/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`,
        );
        return result.data;
    }

    static async getRoomTypes() {
        const response = await axios.get(`${this.BASE_URL}/rooms/types`);
        return response.data;
    }

    static async getAllRooms() {
        const result = await axios.get(`${this.BASE_URL}/rooms/all`);
        return result.data;
    }

    static async getRoomById(roomId: any) {
        const result = await axios.get(`${this.BASE_URL}/rooms/room-by-id/${roomId}`);
        return result.data;
    }

    static async deleteRoom(roomId: any) {
        const result = await axios.delete(`${this.BASE_URL}/rooms/delete/${roomId}`, {
            headers: this.getHeader(),
        });
        return result.data;
    }

    static async updateRoom(roomId: any, formData: any) {
        const result = await axios.put(`${this.BASE_URL}/rooms/update/${roomId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return result.data;
    }

    // Booking

    static async bookRoom(roomId: any, userId: any, booking: any) {
        console.log('USER ID IS: ' + userId);

        const response = await axios.post(`${this.BASE_URL}/bookings/book-room/${roomId}/${userId}`, booking, {
            headers: this.getHeader(),
        });
        return response.data;
    }

    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader(),
        });
        return result;
    }

    static async getBookingByConfirmationCode(bookingCode: any) {
        const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`);
        console.log(result);

        return result.data;
    }

    static async cancelBooking(bookingId: any) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader(),
        });
        return result.data;
    }

    //Authentication checker
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }
}
