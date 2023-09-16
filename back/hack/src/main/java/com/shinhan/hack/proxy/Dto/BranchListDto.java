package com.shinhan.hack.proxy.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BranchListDto {

    private DataHeader dataHeader;
    private DataBody dataBody;

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
        private List<Branch> branchList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Branch {

        @JsonProperty("지점명")
        private String branchName;

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
