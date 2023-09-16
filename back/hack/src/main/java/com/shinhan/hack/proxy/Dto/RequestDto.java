package com.shinhan.hack.proxy.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RequestDto {

    private RequestDto.DataHeader dataHeader;
    private RequestDto.DataBody dataBody;

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
        @JsonProperty("원화환산금액")
        private String amount;

        @JsonProperty("적용환율")
        private String applyFxrate;

        @JsonProperty("우대율")
        private String rate;

        @JsonProperty("가상입금계좌번호")
        private String accountNumber;

        @JsonProperty("가상계좌입금금액")
        private String accountAmount;

        @JsonProperty("가상입금기한일자")
        private String accountDate;

        @JsonProperty("가상입금기한시각")
        private String accountTime;

    }
}
