package com.shinhan.hack.login.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FCMNotificationRequestDto {
    private Long studentId;
    private String title;
    private String body;
    // private String image;
    // private Map<String, String> data;

    @Builder
    public FCMNotificationRequestDto(Long studentId, String title, String body) {
        this.studentId = studentId;
        this.title = title;
        this.body = body;
        // this.image = image;
        // this.data = data;
    }
}