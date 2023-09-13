package com.shinhan.hack.login.service;

import com.google.firebase.messaging.*;
import com.shinhan.hack.login.dto.FCMNotificationRequestDto;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;


@RequiredArgsConstructor
@Service
public class FCMNotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final LoginRepository usersRepository;

    public String sendNotificationByToken(FCMNotificationRequestDto requestDto) {

        Optional<Student> user = usersRepository.findStudentByStudentId(requestDto.getStudentId());

        if (user.isPresent()) {
            if (user.get().getToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle(requestDto.getTitle())
                        .setBody(requestDto.getBody())
                        // .setImage(requestDto.getImage())
                        .build();

//                Message message = Message.builder()
//                        .setToken(user.get().getToken())
//                        .setNotification(notification)
//                        .setAndroidConfig(AndroidConfig.builder()
//                                        .setNotification(AndroidNotification.builder()
//                                                .setClickAction("OPEN_ACTIVITY_1")
//                                                .build())
//                            //.putAllData(requestDto.getData())
//                            //.build();
                Message message = Message.builder()
                        .setToken(user.get().getToken())
                        .setNotification(notification)
                        .putData("click_action", "OPEN_MAIN_PAGE")
                        .build();  // Message 객체 생성을 완료합니다.

                try {
                    firebaseMessaging.send(message);
                    return "알림을 성공적으로 전송했습니다. targetUserId=" + requestDto.getStudentId();
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    return "알림 보내기를 실패하였습니다. targetUserId=" + requestDto.getStudentId();
                }
            } else {
                return "서버에 저장된 해당 유저의 FirebaseToken이 존재하지 않습니다. targetUserId=" + requestDto.getStudentId();
            }

        } else {
            return "해당 유저가 존재하지 않습니다. targetUserId=" + requestDto.getStudentId();
        }
    }


    public String sendFriend(long studentId, long friendStudentId) {

        Optional<Student> user = usersRepository.findStudentByStudentId(friendStudentId);

        Random random = new Random();
        int randomNumber = random.nextInt(9000) + 1000;
        String randomNumberString = Integer.toString(randomNumber);

        if (user.isPresent()) {
            if (user.get().getToken() != null) {
                Notification notification = Notification.builder()
                        .setTitle("친구 추가 인증")
                        .setBody(randomNumberString)
                        .build();

                Message message = Message.builder()
                        .setToken(user.get().getToken())
                        .setNotification(notification)
                        .putData("click_action", "OPEN_MAIN_PAGE")
                        .build();  // Message 객체 생성을 완료합니다.

                try {
                    firebaseMessaging.send(message);
                    return "알림을 성공적으로 전송했습니다. targetUserId=" + friendStudentId;
                } catch (FirebaseMessagingException e) {
                    e.printStackTrace();
                    return "알림 보내기를 실패하였습니다. targetUserId=" + friendStudentId;
                }
            } else {
                return "서버에 저장된 해당 유저의 FirebaseToken이 존재하지 않습니다. targetUserId=" + friendStudentId;
            }

        } else {
            return "해당 유저가 존재하지 않습니다. targetUserId=" + friendStudentId;
        }
    }




}