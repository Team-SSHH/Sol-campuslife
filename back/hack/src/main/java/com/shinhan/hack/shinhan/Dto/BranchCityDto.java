package com.shinhan.hack.shinhan.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchCityDto {

    private BranchCityDto.DataHeader dataHeader;
    private BranchCityDto.DataBody dataBody;

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
        private List<BranchCityDto.Branch> branchList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Branch {

        @JsonProperty("지역명")
        private String branchName;

        @JsonProperty("지역코드")
        private String code;

        @JsonProperty("지점주소")
        private String address;

        @JsonProperty("지점대표전화번호")
        private String phoneNumber;

        @JsonProperty("지점위도")
        private String latitude;

        @JsonProperty("지점경도")
        private String longitude;
    }


}
