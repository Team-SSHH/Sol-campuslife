package com.shinhan.hack.login.dto;

import lombok.*;

import javax.persistence.Column;

public class StudentDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post{
        private Long studentId;
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response{
        private Long studentId;
        private String name;
        private String university;
        private String major;
        private Long grade;
        private String gender;
        private String nationality;
        private Long bankNumber;
        private Long balance;
        private String phoneId;
        private String imageUrl;
        private Boolean locationState;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class getBalance{
        private Long balance;

    }

}



