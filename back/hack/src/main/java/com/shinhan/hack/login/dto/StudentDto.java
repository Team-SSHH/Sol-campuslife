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
        private int studentId;
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response{
        private int studentId;
        private int bankNumber;
        private int balance;
        private String phoneId;
    }
}
