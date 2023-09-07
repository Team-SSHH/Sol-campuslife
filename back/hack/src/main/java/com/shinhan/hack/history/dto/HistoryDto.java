package com.shinhan.hack.history.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.shinhan.hack.login.entity.Student;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

public class HistoryDto {
    @Setter
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Response{
        private int history_id;
//        private Student student_id;
        private int student_id;
        private String content;
        private int deposit;
        private int pay;

        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime transactionTime;
        private int balance;
        private String content_category;
    }
}