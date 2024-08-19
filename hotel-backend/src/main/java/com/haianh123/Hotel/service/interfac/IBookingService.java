package com.haianh123.Hotel.service.interfac;

import com.haianh123.Hotel.dto.Response;
import com.haianh123.Hotel.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long roomId, Long userId, Booking bookingRequest);
    Response findBookingByConfirmationCode(String confirmationCode);
    Response getAllBookings();
    Response cancelBooking(Long bookingId);
}
