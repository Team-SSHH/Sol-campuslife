package com.shinhan.hack.login.controller;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.mapper.LoginMapper;
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


@RestController
@RequestMapping("/sshh")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
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

//    @PostMapping("/login/{studentid}/token")
//    public Mono<ResponseEntity<Void>> postToken(@PathVariable("studentid") Long studentid,
//                                                @RequestBody String token) {
//        System.out.println(token);
//
//        String fcmUrl = "https://fcm.googleapis.com/fcm/send";
//        String serverKey ="AAAAse-LWbY:APA91bH8_L2g06SHMdWKrKEnMMz1b2bRfiA1N06Ea4YMF7A9kuPrDdgj2GG1bPjeDyu6DapGFxYjYrWv9lD0bPzeDIgv6KyM0t6W0GMk8j8MVMAXQiL6V7EAoNCTVe9Zozc9g1fhado7";
//
//        WebClient webClient = WebClient.create();
//
//        String notificationPayload = "{"
//                + "\"to\":\"" + token + "\","
//                + "\"notification\":{"
//                + "\"title\":\"친구인증\","
//                + "\"body\":\"1234\""
//                + "}"
//                + "}"; // Construct your FCM notification payload here
//
//        Mono<ClientResponse> responseMono =
//                webClient.post()
//                        .uri(URI.create(fcmUrl))
//                        .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                        .header(HttpHeaders.AUTHORIZATION, "key=" + serverKey)
//                        .body(BodyInserters.fromValue(notificationPayload))
//                        .exchange();
//
//        return responseMono.flatMap(response -> {
//            if (response.statusCode().is2xxSuccessful()) {
//                System.out.println("Notification sent successfully");
//                return Mono.just(ResponseEntity.ok().<Void>build());
//            } else {
//                System.out.println("Failed to send the notification");
//                return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).<Void>build());
//            }
//        });
//    }
}
