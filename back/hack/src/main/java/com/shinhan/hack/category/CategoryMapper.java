package com.shinhan.hack.category;

import com.shinhan.hack.category.dto.CategoryDto;
import com.shinhan.hack.category.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDto.Response toResponse(Category category);
}
