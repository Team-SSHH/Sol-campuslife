package com.shinhan.hack.login.controller;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.mapper.LoginMapper;
import com.shinhan.hack.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sshh")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService service;
    private final LoginMapper loginMapper;

    @PostMapping("/login")
    public ResponseEntity<StudentDto.Response> login
            (@RequestBody StudentDto.Post requestBody){
        System.out.println(requestBody.getStudentId());
        System.out.println(requestBody.getPassword());
        StudentDto.Response response = loginMapper.toResponseDto(service.login(requestBody));
        System.out.println(response.getGender());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
