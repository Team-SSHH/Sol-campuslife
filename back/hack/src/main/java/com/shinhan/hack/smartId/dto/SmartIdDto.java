package com.shinhan.hack.smartId.dto;

import com.shinhan.hack.login.entity.Student;
import lombok.*;

import java.util.List;


public class SmartIdDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
    private Long cardId;
    private Student student;
    private String university;
    private String major;
    private Long grade;
    private String gender;
    private String nationality;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class FriendsResponse {
        private List<Friend> friends;

        public FriendsResponse(List<Friend> friends) {
            this.friends = friends;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Friend {
        private Long friendID; // 친구의 ID 등 필요한 정보들
        private SmartIdDto.Response smartIdInfo;
        public Friend(Long friendID, SmartIdDto.Response smartIdInfo) {
            this.friendID = friendID;
            this.smartIdInfo = smartIdInfo;
        }
        }
    }

