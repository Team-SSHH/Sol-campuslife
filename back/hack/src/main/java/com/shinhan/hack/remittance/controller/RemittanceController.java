package com.shinhan.hack.remittance.controller;

import com.shinhan.hack.remittance.dto.DutchPayDetailDto;
import com.shinhan.hack.remittance.dto.DutchPayDto;
import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.mapper.RemittanceMapper;
import com.shinhan.hack.remittance.service.RemittanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sshh/remittance")
@RequiredArgsConstructor
public class RemittanceController {
    private final RemittanceService remittanceService;
    private final RemittanceMapper remittanceMapper;


    @PutMapping("/{studentId}/send/{freindStudentId}")
    public ResponseEntity<RemittanceDto.Response> remittance(
            @PathVariable("studentId") Long studentId,
            @PathVariable("freindStudentId") Long freindStudentId,
            @RequestBody RemittanceDto.update remittanceUpdate
    ) {
        remittanceUpdate.setStudentId(studentId);
        remittanceUpdate.setFreindStudentId(freindStudentId);
        RemittanceDto.Response response = remittanceService.remittance(remittanceUpdate);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{studentId}/dutch")
    public ResponseEntity<List<DutchPayDto.Response>> getDutchPay(
            @PathVariable("studentId") Long studentId
    ) {
        List<DutchPayDto.Response> response = remittanceMapper.toResponseDto(remittanceService.dutchPay(studentId));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{studentId}/dutch/{dutchId}")
    public ResponseEntity<List<DutchPayDetailDto.Response>> getDutchPayDetail(
            @PathVariable("studentId") Long studentId,
            @PathVariable("dutchId") Long dutchId
    ){
        List<DutchPayDetailDto.Response> response = remittanceService.getDutchDetail(dutchId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
