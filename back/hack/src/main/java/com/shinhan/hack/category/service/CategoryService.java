package com.shinhan.hack.category.service;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.category.dto.CategoryDto;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.repository.CategoryRepository;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.dto.StudentCategoryDto;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.mapper.LoginMapper;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final FriendsRepository friendsRepository;
    private final CategoryRepository categoryRepository;
    private final LoginRepository studentRepository;

    private final LoginMapper studentMapper;

    @Transactional
    public List<CategoryDto.Response> getCategoryList(Long studentId) {
        // 학생의 카테고리 리스트, 비어있어도 반환해줘야함.
        List<Category> categories = categoryRepository.findByStudent_StudentId(studentId);

        // 반환해줄 카테고리 리스트
        List<CategoryDto.Response> categoryList = new ArrayList<>();
        // categoryList에 CategoryDto.Response 객체들을 넣어줌
        for (Category category : categories
        ) {
            CategoryDto.Response categoryResponse = CategoryDto.Response.builder()
                    .categoryId(category.getCategoryId())
                    .category(category.getCategory())
                    .studentId(studentId)
                    .build(); // 내 학생 ID 설정

            // 카테고리에 있는 친구 목록
            List<Friends> friendsInCategory = friendsRepository.findByCategory_CategoryId(category.getCategoryId());

            List<StudentCategoryDto.Response> studentsInCategory = new ArrayList<>();

            for (Friends friend : friendsInCategory) {

                // 친구 존재 예외 처리 및 결과 반환


                Student friendStudent = studentRepository.findById(friend.getFriendId()).orElseThrow(
                        () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
                );
                StudentDto.Response friendInfo = studentMapper.toResponseDto(friendStudent);

                studentsInCategory.add(friendInfo);
            }

            categoryResponse.setStudents(studentsInCategory);
            categoryList.add(categoryResponse);

        }
        return categoryList;
    }
    @Transactional
    public CategoryDto.Update addCategory(String categoryName, Long studentId){
        // 새 카테고리 생성
        Category newCategory = Category.builder()
                .category(categoryName)
                .student(Student.builder()
                        .studentId(studentId)
                        .build())
                .build();

        categoryRepository.save(newCategory);

        return CategoryDto.Update.builder()
                .categoryId(newCategory.getCategoryId())
                .category(newCategory.getCategory())
                .build();
    }

    @Transactional
    public CategoryDto.Update updateCategory(Long categoryId, String CategoryName) {
        // 변경할 카테고리
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)
        );
        category.setCategory(CategoryName);

        categoryRepository.save(category);

        return CategoryDto.Update.builder()
                .categoryId(category.getCategoryId())
                .category(category.getCategory())
                .build();
    }

}
