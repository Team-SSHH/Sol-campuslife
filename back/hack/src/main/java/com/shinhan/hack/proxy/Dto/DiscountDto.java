package com.shinhan.hack.proxy.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DiscountDto {

    private DiscountDto.DataHeader dataHeader;
    private DiscountDto.DataBody dataBody;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DataHeader{
        private String successCode;
        private String resultCode;
        private String resultMessage;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DataBody {
        @JsonProperty("리스트건수")
        private String listCount;

        @JsonProperty("리스트")
        private List<DiscountDto.Rate> branchList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Rate {
        @JsonProperty("순서")
        private String order;

        @JsonProperty("통화")
        private String currency;

        @JsonProperty("우대율")
        private String rate;
    }
}
