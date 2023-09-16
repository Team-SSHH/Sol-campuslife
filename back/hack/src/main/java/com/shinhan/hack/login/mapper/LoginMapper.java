package com.shinhan.hack.login.mapper;

import com.shinhan.hack.login.dto.StudentCategoryDto;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LoginMapper {
    StudentDto.Response toResponseDto(Student student);

    StudentCategoryDto.Response toCategoryResponseDto(Student student);
}
