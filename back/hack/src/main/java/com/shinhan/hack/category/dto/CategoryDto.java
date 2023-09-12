package com.shinhan.hack.category.dto;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import lombok.*;

import javax.persistence.*;
import java.util.List;

public class CategoryDto {
    private Long categoryId;
    private String category;


    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Response{
        private Long categoryId;
        Student student;
        private String category;
        private List<StudentDto.Response> students;
        private Long studentId;
    }
}
