package com.shinhan.hack.remittance.controller;

import com.shinhan.hack.remittance.dto.RemittanceDto;
import com.shinhan.hack.remittance.service.RemittanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sshh/remittance")
@RequiredArgsConstructor
public class RemittanceController {
    private final RemittanceService remittanceService;

    @PutMapping("/{studentId}/send/{freindStudentId}")
    public ResponseEntity<RemittanceDto.Response> remittance(
        @PathVariable("studentId") Long studentId,
        @PathVariable("freindStudentId") Long freindStudentId,
        @RequestBody RemittanceDto.update remittanceUpdate
    ){
        remittanceUpdate.setStudentId(studentId);
        remittanceUpdate.setFreindStudentId(freindStudentId);
        RemittanceDto.Response response = remittanceService.remittance(remittanceUpdate);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
