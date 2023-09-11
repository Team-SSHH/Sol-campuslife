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
        private long historyId;
//        private Student student_id;
        private long studentId;
        private String content;
        private long deposit;
        private long pay;

        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime transactionTime;
        private String day;
        private long balance;
        private String contentCategory;
        private String imgUrl;
    }


    @Getter
    public static class Summary {
        private long sum;
        private long count;

        public Summary(long sum, long count) {
            this.sum = sum;
            this.count = count;
        }
    }

    @Getter
    @Setter
    public static class StatisticsSummary {
        private long totalSum;
        private int studentCount;
        private long average;

    }
}

