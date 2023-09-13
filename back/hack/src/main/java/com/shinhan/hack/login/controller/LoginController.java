package com.shinhan.hack.login.controller;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.login.dto.StudentDto;
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

    @PostMapping("/login/{studentid}/token")
    public Mono<ResponseEntity<Void>> postToken(@PathVariable("studentid") Long studentid,
                                                @RequestBody String token) {
        System.out.println(token);

        String fcmUrl = "https://fcm.googleapis.com/fcm/send";
        String serverKey = "";

        WebClient webClient = WebClient.create();

        String notificationPayload = "{"
                + "\"to\":\"" + token + "\","
                + "\"notification\":{"
                + "\"title\":\"Notification Title\","
                + "\"body\":\"This is the body of the notification\""
                + "}"
                + "}"; // Construct your FCM notification payload here

        Mono<ClientResponse> responseMono =
                webClient.post()
                        .uri(URI.create(fcmUrl))
                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                        .header(HttpHeaders.AUTHORIZATION, "key=" + serverKey)
                        .body(BodyInserters.fromValue(notificationPayload))
                        .exchange();

        return responseMono.flatMap(response -> {
            if (response.statusCode().is2xxSuccessful()) {
                System.out.println("Notification sent successfully");
                return Mono.just(ResponseEntity.ok().<Void>build());
            } else {
                System.out.println("Failed to send the notification");
                return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).<Void>build());
            }
        });
    }
}
