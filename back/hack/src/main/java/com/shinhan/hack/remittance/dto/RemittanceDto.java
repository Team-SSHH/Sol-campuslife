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
        private String friendPhoneId;
        private Long friendBalance;
        private String content;
        private Long amount;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class update{
        private Long studentId;
        private Long friendId;
        private Long amount;
        private String content;
    }
}
