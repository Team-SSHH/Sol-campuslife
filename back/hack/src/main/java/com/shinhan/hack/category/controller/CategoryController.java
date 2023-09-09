package com.shinhan.hack.category.controller;

import com.shinhan.hack.category.dto.CategoryDto;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.repository.CategoryRepository;
import com.shinhan.hack.friends.dto.FriendsDto;
import com.shinhan.hack.login.entity.Student;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sshh/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryRepository categoryRepository;

    @PostMapping("/{studentid}")
    public ResponseEntity<CategoryDto> addCategory(@PathVariable("studentid") Long studentid, @RequestBody Map<String, String> body) {
        String categoryName = body.get("categoryName");

        List<Category> existingCategories = categoryRepository.findByCategory(categoryName);
        if (!existingCategories.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A category with this name already exists");
        }

        // 새 카테고리 생성
        Category newCategory = Category.builder()
                .category(categoryName)
                .build();

        Student student = new Student();
        student.setStudentId(studentid);
        newCategory.setStudent(student);

        Category savedCategory = categoryRepository.save(newCategory);

        // Convert the saved category to DTO
        CategoryDto savedCategoryDto = new CategoryDto();
        savedCategoryDto.setCategoryId(savedCategory.getCategoryId());
        savedCategoryDto.setCategory(savedCategory.getCategory());

        return ResponseEntity.ok(savedCategoryDto);
    }


    @PutMapping("/{studentid}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable("studentid") Long studentid, @RequestBody CategoryDto categoryUpdate) {
        Long categoryId = categoryUpdate.getCategoryId();
        String newCategoryName = categoryUpdate.getCategory();

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "일치하는 카테고리 없음"));
        System.out.println("category = " + category);

        List<Category> existingCategories = categoryRepository.findByCategory(newCategoryName);
        System.out.println("existingCategories = " + existingCategories);
        if (!existingCategories.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 존재하는 카테고리");
        }

        category.setCategory(newCategoryName);
        Category updatedCategroy = categoryRepository.save(category);

        CategoryDto updatedCategroyDto = new CategoryDto();
        updatedCategroyDto.setCategoryId(updatedCategroy.getCategoryId());
        updatedCategroyDto.setCategory(updatedCategroy.getCategory());

        return ResponseEntity.ok(updatedCategroyDto);
    }

}
