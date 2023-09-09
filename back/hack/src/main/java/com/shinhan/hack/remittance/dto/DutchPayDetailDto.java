package com.shinhan.hack.remittance.dto;

import com.shinhan.hack.login.entity.Student;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

public class DutchPayDetailDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private Long dutchDetailId;
        private Long dutchAmount;
        private boolean remittanceState;
        private LocalDateTime remittanceTime;
        private String name;
    }
}
