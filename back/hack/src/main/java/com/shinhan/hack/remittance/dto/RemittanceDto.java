package com.shinhan.hack.remittance.dto;

import lombok.*;

public class RemittanceDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Response{
        private String phoneId;
        private Long balance;
        private String freindPhoneId;
        private Long freindBalance;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class update{
        private Long studentId;
        private Long freindStudentId;
        private Long amount;
    }
}
