package com.shinhan.hack.remittance.dto;

import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.remittance.entity.DutchPayDetail;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class DutchPayDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private Long dutchId;
        private Long amount;
        private Boolean dutchState;
        private Long number;
        private LocalDateTime requestTime;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Post{
        private List<Long> friendList;
        private Long amount;
        private Long studentId;
    }
}
