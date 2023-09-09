package com.shinhan.hack.smartId.dto;

import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.smartId.entity.SmartId;
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
        private Long fId;
        private String category;
        private Student friend;
        private SmartId smartId;  // Add this field
        public Friend(Long fId, String category, Student friend, SmartId smartId) {
            this.fId = fId;
            this.category = category;
            this.friend = friend;
            this.smartId = smartId;
        }
        }
    }

