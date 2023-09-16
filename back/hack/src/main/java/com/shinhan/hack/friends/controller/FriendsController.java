package com.shinhan.hack.friends.controller;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.friends.dto.FriendsDto;
import com.shinhan.hack.friends.service.FriendsService;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sshh/friends")
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT })
@RequiredArgsConstructor public class FriendsController {

    private final FriendsService friendsService;

    private final LoginRepository studentRepository;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<FriendsDto>> getFriends(
            @PathVariable("studentId") Long studentId) {
        List<FriendsDto> friendsList= friendsService.getFriendsByStudent(studentId);
        return new ResponseEntity<>(friendsList, HttpStatus.OK);
    }

    @Transactional
    @PostMapping("/{studentId}/store/{friendStudentId}")
    public ResponseEntity<List<FriendsDto>> saveFriend(
            @PathVariable("studentId") Long studentId, @PathVariable("friendStudentId") Long friendStudentId) {
        studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        studentRepository.findById(friendStudentId).orElseThrow(
                () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
        );
        friendsService.saveFriend(studentId,friendStudentId);
        friendsService.saveFriend(friendStudentId,studentId);
        return new ResponseEntity<>(friendsService.getFriendsByStudent(studentId), HttpStatus.OK);
    }

    @DeleteMapping("/{studentId}/delete/{friendStudentId}")
    public ResponseEntity<List<FriendsDto>> deleteFriend(
            @PathVariable("studentId") Long studentId, @PathVariable("friendStudentId") Long friendStudentId) {
        List<FriendsDto> friendsList= friendsService.deleteFriend(studentId,friendStudentId);
        friendsService.deleteFriend(friendStudentId, studentId);
        return new ResponseEntity<>(friendsList, HttpStatus.OK);
    }


    @PutMapping("/{studentId}/update/{friendStudentId}")
    public ResponseEntity<List<FriendsDto>> updateFriend(
            @PathVariable("studentId") Long studentId, @PathVariable("friendStudentId") Long friendStudentId, @RequestBody Map<String, Long> body) {
        Long categoryId = body.get("categoryId");
        List<FriendsDto> friendsList = friendsService.updateFriend(studentId, friendStudentId, categoryId);
        return new ResponseEntity<>(friendsList, HttpStatus.OK);
    }
}