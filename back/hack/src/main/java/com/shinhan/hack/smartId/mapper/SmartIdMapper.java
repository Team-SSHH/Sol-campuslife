package com.shinhan.hack.smartId.mapper;

import com.shinhan.hack.smartId.dto.SmartIdDto;
import com.shinhan.hack.smartId.entity.SmartId;
import org.mapstruct.Mapper;
import org.springframework.data.jpa.repository.JpaRepository;

@Mapper(componentModel="spring")
public interface SmartIdMapper {
    SmartIdDto.Response toResponseDto(SmartId smartId);

}
