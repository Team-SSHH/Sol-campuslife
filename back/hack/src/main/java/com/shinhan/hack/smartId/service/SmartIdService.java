package com.shinhan.hack.smartId.service;

import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.smartId.dto.SmartIdDto;
import com.shinhan.hack.smartId.entity.SmartId;
import com.shinhan.hack.smartId.mapper.SmartIdMapper;
import com.shinhan.hack.smartId.repository.SmartIdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SmartIdService {
    private final SmartIdRepository smartIdRepository;
    private final FriendsRepository friendsRepository;
    private final SmartIdMapper smartIdMapper;

    public SmartId getSmartId(Long studentId) {
        Student student = new Student();
        student.setStudentId(studentId);
        return smartIdRepository.findByStudent(student);
    }

    public SmartIdDto.FriendsResponse getFriends(Long studentId) {
        Student student = new Student();
        student.setStudentId(studentId); //2014
//        System.out.println("student = " + student);

        List<Friends> friendsList = friendsRepository.findByStudent(student);
//        System.out.println("friendsList = " + friendsList);
        if (friendsList == null || friendsList.isEmpty()) {
            return null;
        }

        List<SmartIdDto.Friend> friendDTOs = new ArrayList<>();

        for (Friends friend : friendsList) {
            SmartId friendSmartID = smartIdRepository.findByStudent(friend.getFriend());
            System.out.println("friendSmartID = " + friendSmartID);
            if (friendSmartID != null) {
                // Convert the entity to DTO
                SmartIdDto.Response response=smartIdMapper.toResponseDto(friendSmartID);
                System.out.println("response = " + response);
                // Create a Friend DTO and add it to the list
                SmartIdDto.Friend friendDTO = new SmartIdDto.Friend(response.getCardId(), response);
                System.out.println("friendDTO = " + friendDTO);
                friendDTOs.add(friendDTO);
            }

//        SmartId smartId = smartIdRepository.findById(studentId).orElse(null);
//        if (smartId == null) {
//            return null;
        }
//        List<Friends> friendsList = smartId.getFriendsList();
//        List<SmartIdDto.Friend> friendDTOs = new ArrayList<>();

//        List<Friends> friendsList = smartIdRepository.findByStudent(student).getFriendsList();
//        List<SmartIdDto.Friend> friendDTOs = new ArrayList<>();

//        for (Friends friend : friendsList) {
//            friendDTOs.add(new SmartIdDto.Friend(friend.getFriendId()));
//        }

        return new SmartIdDto.FriendsResponse(friendDTOs);
    }
}

