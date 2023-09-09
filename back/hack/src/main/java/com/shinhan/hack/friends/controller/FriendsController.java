package com.shinhan.hack.friends.controller;

import com.shinhan.hack.friends.service.FriendsService;
import com.shinhan.hack.smartId.dto.SmartIdDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sshh/friends")
@RequiredArgsConstructor
public class FriendsController {
    private final FriendsService friendsService;
    @PostMapping("/{studentId}/store/{friendStudentId}")
    public ResponseEntity<String> abc(@PathVariable("studentId") Long studentId, @PathVariable("friendStudentId") Long friendStudentId) {


        friendsService.addFriend(studentId, friendStudentId, 1L);
        return new ResponseEntity<>("Success", HttpStatus.OK);
    }


//    @GetMapping("/{studentId}/friends")
//    public ResponseEntity<SmartIdDto.FriendsResponse> getFriends(
//            @PathVariable("studentId") Long studentId
//    ) {
//        SmartIdDto.FriendsResponse response = smartIdService.getFriends(studentId);
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }
}
