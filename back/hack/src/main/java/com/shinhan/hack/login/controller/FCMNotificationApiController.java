package com.shinhan.hack.login.controller;

import com.shinhan.hack.login.dto.FCMNotificationRequestDto;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import com.shinhan.hack.login.service.FCMNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Optional;


@RequiredArgsConstructor
@RestController
@RequestMapping("/sshh")
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
public class FCMNotificationApiController {

    private final FCMNotificationService fcmNotificationService;
    private final LoginRepository loginRepository;

//    @Operation(summary = "알림 보내기")
    @PostMapping("/push")
    public String sendNotificationByToken(@RequestBody FCMNotificationRequestDto requestDto) {
        return fcmNotificationService.sendNotificationByToken(requestDto);
    }

    @PostMapping("/push/{studentid}/friend/{friendStudentId}")
    public String sendNotificationByToken( @PathVariable("studentid") Long studentid, @PathVariable("friendStudentId") Long friendStudentId) {
        return fcmNotificationService.sendFriend(studentid, friendStudentId);
    }

    @PostMapping("/login/{studentid}/token")
    public Mono<ResponseEntity<Void>> postToken(@PathVariable("studentid") Long studentid,
                                                @RequestBody Map<String, String> body) {
        String token = body.get("token");
        Optional<Student> optionalStudent = loginRepository.findStudentByStudentId(studentid);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setToken(token);
            loginRepository.save(student);
        }
        return Mono.just(ResponseEntity.ok().build());
    }
}