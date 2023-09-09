package com.shinhan.hack.remittance.mapper;

import com.shinhan.hack.remittance.dto.DutchPayDto;
import com.shinhan.hack.remittance.entity.DutchPay;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RemittanceMapper {
    List<DutchPayDto.Response> toResponseDto(List<DutchPay> DutchPay);


}
