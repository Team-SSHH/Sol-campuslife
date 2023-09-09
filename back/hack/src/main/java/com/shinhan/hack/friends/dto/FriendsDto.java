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
    private StudentDto.Response friend;  // 변경된 부분

    public FriendsDto(Long fId, Long categoryId, String category,
                      Long studentId, StudentDto.Response friend) {  // 변경된 부분
        this.fId = fId;
        this.categoryId = categoryId;
        this.category = category;
        this.studentId = studentId;
        this.friend = friend;  // 변경된 부분
    }
}
