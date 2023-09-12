package com.shinhan.hack.friends.dto;

import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.login.dto.StudentDto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FriendsDto {
    private Long fId;
    private Long categoryId;
    private String category;
    private Long studentId;
    private StudentDto.Response friend;
}
