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
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class RemittanceController {
    private final RemittanceService remittanceService;
    private final RemittanceMapper remittanceMapper;


    @PutMapping("/{studentId}/send/{friendStudentId}")
    public ResponseEntity<RemittanceDto.Response> remittance(
            @PathVariable("studentId") Long studentId,
            @PathVariable("friendStudentId") Long friendStudentId,
            @RequestBody RemittanceDto.update remittanceUpdate
    ) {
        remittanceUpdate.setStudentId(studentId);
        remittanceUpdate.setFriendStudentId(friendStudentId);
        RemittanceDto.Response response = remittanceService.remittance(remittanceUpdate);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{studentId}/won1")
    public ResponseEntity<RemittanceDto.Response> won1(
            @PathVariable("studentId") Long studentId,
            @RequestBody RemittanceDto.update remittanceUpdate
    ){
        remittanceUpdate.setStudentId(studentId);
        RemittanceDto.Response response = remittanceService.won1(remittanceUpdate);

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
