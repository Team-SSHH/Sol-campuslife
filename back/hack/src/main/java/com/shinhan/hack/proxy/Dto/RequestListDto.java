package com.shinhan.hack.proxy.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestListDto {
    private RequestListDto.DataHeader dataHeader;
    private RequestListDto.DataBody dataBody;

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
        private List<RequestListDto.Rate> rateList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Rate{
        @JsonProperty("상태구분")
        private String state;

        @JsonProperty("신청인명")
        private String name;

        @JsonProperty("신청인전화번호")
        private String phoneNumber;

        @JsonProperty("신청인생년월일")
        private String birth;

        @JsonProperty("신청일")
        private String requestDate;

        @JsonProperty("수령일")
        private String receiveDate;

        @JsonProperty("수령점명")
        private String receiveBranch;

        @JsonProperty("가상계좌입금일자")
        private String accountDate;

        @JsonProperty("가상입금계좌번호")
        private String accountNumber;

        @JsonProperty("가상계좌입금금액")
        private String accountAmount;

        @JsonProperty("가상입금기한일자")
        private String accountDeadLineDate;

        @JsonProperty("가상입금기한시각")
        private String accountDeadLineTime;

        @JsonProperty("환전구분")
        private String exchangeClass;

        @JsonProperty("환전통화")
        private String exchangeCurrency;

        @JsonProperty("환전금액")
        private String exchangeAmount;

        @JsonProperty("우대적용환율")
        private String rate;

        @JsonProperty("원화금액")
        private String krwAmount;
    }

}
