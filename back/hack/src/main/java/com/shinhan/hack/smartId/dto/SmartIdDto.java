package com.shinhan.hack.smartId.dto;

import com.shinhan.hack.login.entity.Student;
import lombok.*;


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
}
