package com.shinhan.hack.login.controller;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.mapper.LoginMapper;
import com.shinhan.hack.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sshh")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class LoginController {

    private final LoginService service;
    private final LoginMapper loginMapper;

    @PostMapping("/login")
    public ResponseEntity<StudentDto.Response> login
            (@RequestBody StudentDto.Post requestBody){

        StudentDto.Response response = loginMapper.toResponseDto(service.login(requestBody));
        if(response == null){
            return new ResponseEntity<>(null , HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
