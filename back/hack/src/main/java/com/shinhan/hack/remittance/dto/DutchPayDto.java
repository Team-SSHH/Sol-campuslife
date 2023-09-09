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
        private Student student;
        private Long amount;
        private Boolean dutchState;
        private LocalDateTime requestTime;
        List<DutchPayDetail> dutchPayDetails;
    }
}
