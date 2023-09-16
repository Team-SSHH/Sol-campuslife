package com.shinhan.hack.category.dto;

import com.shinhan.hack.login.dto.StudentCategoryDto;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import lombok.*;

import javax.persistence.*;
import java.util.List;

public class CategoryDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response {
        private Long categoryId;
        private Student student;
        private String category;
        private List<StudentCategoryDto.Response> students;
        private Long studentId;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Post {
        private String categoryName;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Update {
        private Long categoryId;
        private String category;

        private List<StudentCategoryDto.Response> students;
        private Long studentId;

    }
}
