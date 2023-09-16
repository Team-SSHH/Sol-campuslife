package com.shinhan.hack.Location.mapper;

import com.shinhan.hack.Location.dto.LocationDto;
import com.shinhan.hack.login.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    LocationDto.friend toResponse(Student student);
}
