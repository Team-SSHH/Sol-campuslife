package com.shinhan.hack.friends.controller;

import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.service.FriendsService;
import com.shinhan.hack.history.dto.HistoryDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sshh/friends")
@RequiredArgsConstructor
public class FriendsController {
    private final FriendsService friendsService;
//    @PostMapping("/{studentId}/store/{friendStudentId}")
//    public ResponseEntity<String> abc(@PathVariable("studentId") Long studentId, @PathVariable("friendStudentId") Long friendStudentId) {
//
//
//        friendsService.addFriend(studentId, friendStudentId, 1L);
//        return new ResponseEntity<>("Success", HttpStatus.OK);
//    }
//
//
    @GetMapping("/{studentId}")
    public ResponseEntity<List<Friends>> getFriends(
            @PathVariable("studentId") Long studentId) {
        List<Friends> friends = friendsService.getFriendsByStudentId(studentId);
        return new ResponseEntity<>(friends, HttpStatus.OK);
    }


//    @GetMapping("/history")
//    public ResponseEntity<List<HistoryDto.Response>> getAllHistory() {
//        List<HistoryDto.Response> responses = historyService.getAllHistory();
//        return new ResponseEntity<>(responses, HttpStatus.OK);
//    }
}
