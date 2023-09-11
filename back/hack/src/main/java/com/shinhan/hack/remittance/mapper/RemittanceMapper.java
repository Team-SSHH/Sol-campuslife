package com.shinhan.hack.remittance.mapper;

import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.remittance.dto.DutchPayDetailDto;
import com.shinhan.hack.remittance.dto.DutchPayDto;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.entity.DutchPay;
import com.shinhan.hack.remittance.entity.DutchPayDetail;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RemittanceMapper {
    RemittanceDto.Response toResponseDto(Student student);
    List<DutchPayDto.Response> toDutchResponseDto(List<DutchPay> DutchPay);

    RemittanceDto.update toUpdateFromSend(DutchPayDetailDto.send send);
    DutchPayDetailDto.Response toDetailResponseDto(DutchPayDetail dutchPayDetail);


}
