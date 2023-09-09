package com.shinhan.hack.friends.dto;

import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.login.dto.StudentDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendsDto {
    private Long fId;
    private Long categoryId;
    private String category;
    private Long studentId;
    private StudentDto.Response friend;

    public FriendsDto(Long fId, Long categoryId, String category,
                      Long studentId, StudentDto.Response friend) {
        this.fId = fId;
        this.categoryId = categoryId;
        this.category = category;
        this.studentId = studentId;
        this.friend = friend;
    }
}
