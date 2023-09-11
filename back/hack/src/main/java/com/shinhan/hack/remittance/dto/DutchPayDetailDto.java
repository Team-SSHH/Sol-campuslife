package com.shinhan.hack.remittance.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime remittanceTime;
        private String name;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class consent{
        private String studentName;
        private List<Student> frindList;
        private Long dutchAmount;
        private Long amount;
        private String content;
        private Long dutchId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class send{
        private Long dutchId;
        private Long studentId;
        private Long friendId;
        private Long dutchAmount;
    }
}
