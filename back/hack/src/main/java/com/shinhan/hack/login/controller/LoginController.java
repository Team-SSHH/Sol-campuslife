package com.shinhan.hack.login.controller;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.dto.StudentLocation;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.mapper.LoginMapper;
import com.shinhan.hack.login.repository.LoginRepository;
import com.shinhan.hack.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@RequestMapping("/sshh")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT})
public class LoginController {

    private final LoginService service;
    private final LoginMapper loginMapper;
    private final LoginRepository studentRepository;

    @PostMapping("/login")
    public ResponseEntity<StudentDto.Response> login
            (@RequestBody StudentDto.Post requestBody) {

        StudentDto.Response response = loginMapper.toResponseDto(service.login(requestBody));

        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/login/{studentId}/balance")
    public ResponseEntity<StudentDto.getBalance> getBalance(
            @PathVariable("studentId") Long studentId
    ) {
        StudentDto.getBalance response = StudentDto.getBalance.builder()
                .balance(studentRepository.findBalanceByStudentId(studentId).orElseThrow(
                        () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
                )).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/login/studentId")
    public ResponseEntity<List<Long>> getStudentId(){
        List<Long> studentIdList = studentRepository.findStudentId();
        if(studentIdList.isEmpty()){
            throw new CustomException(ErrorCode.MEMBER_IS_EMPTY);
        }
        return new ResponseEntity<>(studentIdList, HttpStatus.OK);
    }

    @PostMapping("/login/{studentid}/location")
    public Mono<ResponseEntity<Void>> postLocation(@PathVariable("studentid") Long studentid,
                                                   @RequestBody StudentLocation studentLocation) {
        Double lat = studentLocation.getLat();
        Double lon = studentLocation.getLon();

        Optional<Student> optionalStudent = studentRepository.findStudentByStudentId(studentid);

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setLat(lat);
            student.setLon(lon);
            studentRepository.save(student);
            return Mono.just(ResponseEntity.ok().build());
        } else {
            return Mono.just(ResponseEntity.notFound().build());
        }
    }
}
