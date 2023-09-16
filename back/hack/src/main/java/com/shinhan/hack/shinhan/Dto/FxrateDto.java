package com.shinhan.hack.shinhan.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FxrateDto {

    private FxrateDto.DataHeader dataHeader;
    private FxrateDto.DataBody dataBody;

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
        @JsonProperty("고시일자")
        private String noticeDay;

        @JsonProperty("고시시간")
        private String noticeTime;

        @JsonProperty("고시회차")
        private String noticeNumber;

        @JsonProperty("환율리스트건수")
        private String listCount;

        @JsonProperty("환율리스트")
        private List<FxrateDto.Rate> rateList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Rate{
        @JsonProperty("통화CODE")
        private String currencyCode;

        @JsonProperty("통화CODE_DISPLAY")
        private String currencyCodeDisplay;

        @JsonProperty("전신환매입환율")
        private String telegraphicBuyRate;

        @JsonProperty("전신환매도환율")
        private String telegraphicSellRate;

        @JsonProperty("지폐매입환율")
        private String paperBuyRate;

        @JsonProperty("지폐매도환율")
        private String paperSellRate;

        @JsonProperty("TC매입환율")
        private String TCBuyRate;

        @JsonProperty("TC매도환율")
        private String TCSellRate;

        @JsonProperty("매매기준환율")
        private String tradeBuyRate;

        @JsonProperty("대미환산환율")
        private String tradeSellRate;
    }
}
