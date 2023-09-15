package com.shinhan.hack.login.dto;

import lombok.*;

public class StudentCategoryDto {
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Response{
        private Long categoryId;
        private String categoryName;
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
    }
}

