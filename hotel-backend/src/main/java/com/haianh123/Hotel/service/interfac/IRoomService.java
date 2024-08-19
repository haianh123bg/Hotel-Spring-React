package com.haianh123.Hotel.service.interfac;

import com.haianh123.Hotel.dto.Response;
import com.haianh123.Hotel.entity.Room;
import com.haianh123.Hotel.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {

    Response addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description);

    List<String> getAllRoomTypes();

    Response getAllRooms();

    Response deleteRoom(Long roomId);

    Response updateRoom(Long roomId, MultipartFile photo, String roomType, BigDecimal roomPrice, String description);

    Response getRoomById(Long roomId);

    Response getAvailableRoomByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    Response getAllAvailableRooms();

}
