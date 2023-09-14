package com.shinhan.hack.remittance.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    public static class Response implements Comparable<Response>{
        private Long dutchId;
        private Long amount;
        private Boolean dutchState;
        private Long number;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private LocalDateTime requestTime;
        private List<DutchPayDetailDto.Response> details;

        @Override
        public int compareTo(Response o) {
            if(o.dutchState)return 1;
            return (int)(this.getDutchId() - o.getDutchId());
        }
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
