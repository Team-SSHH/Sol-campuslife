package com.shinhan.hack.Location.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LocationDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response{
        private List<friend> friendList;
        private Boolean locationState;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class friend{
        private Double distance;
        private Long studentId;
        private String name;
        private String university;
        private String major;
        private Long grade;
        private String gender;
        private String nationality;
        private Long bankNumber;
        private Long balance;
        private String phoneId;
        private String imageUrl;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class SitePost{
         private Double latitude;
         private Double longitude;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class StatePost{
        private Boolean locationState;
        private Double latitude;
        private Double longitude;
    }
}
