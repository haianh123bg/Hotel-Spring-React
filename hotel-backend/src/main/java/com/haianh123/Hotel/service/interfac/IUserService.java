package com.haianh123.Hotel.service.interfac;

import com.haianh123.Hotel.dto.LoginRequest;
import com.haianh123.Hotel.dto.Response;
import com.haianh123.Hotel.entity.User;

public interface IUserService {

    Response register(User register);
    Response login(LoginRequest loginRequest);
    Response getAllUsers();
    Response getUserBookingHistory(String userId);
    Response deleteUser(String userId);
    Response getUserById(String userId);
    Response getMyInfo(String email);
}
