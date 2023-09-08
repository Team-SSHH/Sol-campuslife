package com.shinhan.hack.smartId.controller;

import com.shinhan.hack.smartId.dto.SmartIdDto;
import com.shinhan.hack.smartId.mapper.SmartIdMapper;
import com.shinhan.hack.smartId.service.SmartIdService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sshh/smartId")
@RequiredArgsConstructor
public class SmartIdController {

    private final SmartIdService smartIdService;
    private final SmartIdMapper smartIdMapper;

    @GetMapping("/{studentId}")
    public ResponseEntity<SmartIdDto.Response> getSmartId(
            @PathVariable("studentId") Long studentId
    ) {
        SmartIdDto.Response response = smartIdMapper.toResponseDto(smartIdService.getSmartId(studentId));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
