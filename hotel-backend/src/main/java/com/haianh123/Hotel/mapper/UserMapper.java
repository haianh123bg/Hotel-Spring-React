package com.haianh123.Hotel.mapper;

import com.haianh123.Hotel.dto.UserDTO;
import com.haianh123.Hotel.entity.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toUserDTO(User user);
}
