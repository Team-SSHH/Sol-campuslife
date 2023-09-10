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
import java.util.NoSuchElementException;

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
            @PathVariable("studentId") Long studentId
    ){
        RemittanceDto.Response response;
        try {
            response = remittanceService.won1(studentId);
        }catch(NoSuchElementException e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{studentId}/consent")
    public ResponseEntity<DutchPayDetailDto.consent> sendDutch(
            @PathVariable("studentId") Long studentId,
            @RequestBody DutchPayDto.Post dutchPost
    ){
        dutchPost.setStudentId(studentId);
        DutchPayDetailDto.consent response = remittanceService.consentDutch(dutchPost);
        // 알림

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("{studentId}/dutch/{friendId}")
    public ResponseEntity<RemittanceDto.Response> dutchPaySend(
            @PathVariable("studentId") Long studentId,
            @PathVariable("friendId") Long friendId,
            @RequestBody DutchPayDetailDto.send sendInfo
    ){
        sendInfo.setFriendId(friendId);
        sendInfo.setStudentId(studentId);
        RemittanceDto.Response response;
        try{
            response = remittanceService.dutchSend(sendInfo);
        }catch (NoSuchElementException e){
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

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
