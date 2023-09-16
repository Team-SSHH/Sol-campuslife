package com.shinhan.hack.category;

import com.shinhan.hack.category.dto.CategoryDto;
import com.shinhan.hack.category.entity.Category;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-09-16T23:23:23+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.2.1.jar, environment: Java 11.0.0.1 (Oracle Corporation)"
)
@Component
public class CategoryMapperImpl implements CategoryMapper {

    @Override
    public CategoryDto.Response toResponse(Category category) {
        if ( category == null ) {
            return null;
        }

        CategoryDto.Response.ResponseBuilder response = CategoryDto.Response.builder();

        response.categoryId( category.getCategoryId() );
        response.student( category.getStudent() );
        response.category( category.getCategory() );

        return response.build();
    }
}
