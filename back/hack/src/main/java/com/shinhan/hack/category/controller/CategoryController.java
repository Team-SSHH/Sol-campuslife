package com.shinhan.hack.category.controller;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.category.CategoryMapper;
import com.shinhan.hack.category.dto.CategoryDto;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.repository.CategoryRepository;
import com.shinhan.hack.friends.dto.FriendsDto;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;

import com.shinhan.hack.login.dto.StudentCategoryDto;

import com.shinhan.hack.friends.service.FriendsService;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.login.mapper.LoginMapper;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sshh/category")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT})
public class CategoryController {

    private final FriendsService friendsService;
    private final CategoryRepository categoryRepository;
    private final FriendsRepository friendsRepository;
    private final LoginRepository studentRepository;
    private final CategoryMapper categoryMapper;
    private final LoginMapper studentMapper;


    @GetMapping("/{studentId}")
    public ResponseEntity<List<CategoryDto.Response>> getCategory(
            @PathVariable("studentId") Long studentId
    ) {
        // 학생 존재 여부 예외 처리
        studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 학생의 카테고리 리스트
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

                Student friendStudent = studentRepository.findById(friend.getFriendId()).orElseThrow(
                        () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
                );

                StudentCategoryDto.Response friendInfo = new StudentCategoryDto.Response();


                friendInfo.setCategoryId(category.getCategoryId());
                friendInfo.setCategoryName(category.getCategory());

                friendInfo.setStudentId(friendStudent.getStudentId());
                friendInfo.setName(friendStudent.getName());
                friendInfo.setUniversity(friendStudent.getUniversity());

                friendInfo.setMajor(friendStudent.getMajor());
                friendInfo.setGrade(friendStudent.getGrade());
                friendInfo.setGender(friendStudent.getGender());
                friendInfo.setNationality(friendStudent.getNationality());
                friendInfo.setBankNumber(friendStudent.getBankNumber());
                friendInfo.setBalance(friendStudent.getBalance());
                friendInfo.setPhoneId(friendStudent.getPhoneId());
                friendInfo.setImageUrl(friendStudent.getImageUrl());

                studentsInCategory.add(friendInfo);
            }

            categoryResponse.setStudents(studentsInCategory);
            categoryList.add(categoryResponse);
        }

        return ResponseEntity.ok(categoryList);
    }


    @PostMapping("/{studentId}")
    public ResponseEntity<CategoryDto.Update> addCategory(
            @PathVariable("studentId") Long studentId,
            @RequestBody CategoryDto.Post categoryDtoPost
    ) {

        // 학생 존재 여부 예외 처리
        studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 추가할 카테고리명
        String categoryName = categoryDtoPost.getCategoryName();

        // 추가할 카테고리명이 학생의 카테고리 중에 있는지 확인 및 예외처리
        List<Category> existingCategories = categoryRepository.findByCategoryAndStudent_StudentId(categoryName, studentId);

        if (!existingCategories.isEmpty()) {
            throw new CustomException(ErrorCode.ALREADY_CATEGORY);
        }

        // 새 카테고리 생성
        Category newCategory = Category.builder()
                .category(categoryName)
                .student(Student.builder()
                        .studentId(studentId)
                        .build())
                .build();

        categoryRepository.save(newCategory);

        // Convert the saved category to DTO
        CategoryDto.Update savedCategoryDto = CategoryDto.Update.builder()
                .categoryId(newCategory.getCategoryId())
                .category(newCategory.getCategory())
                .build();

        return ResponseEntity.ok(savedCategoryDto);
    }


    @PutMapping("/{studentId}")
    public ResponseEntity<CategoryDto.Update> updateCategory(
            @PathVariable("studentId") Long studentId,
            @RequestBody CategoryDto.Update categoryUpdate
    ) {
        // 학생 존재 여부 예외 처리
        studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 받아온 값 저장
        Long categoryId = categoryUpdate.getCategoryId();
        String newCategoryName = categoryUpdate.getCategory();

        // 변경할 카테고리
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)
        );

        // 변경할 카테고리가 존재하는 지 여부
        List<Category> existingCategories = categoryRepository.findByCategoryAndStudent_StudentId(newCategoryName, studentId);

        if (!existingCategories.isEmpty()) {
            throw new CustomException(ErrorCode.ALREADY_CATEGORY);
        }

        category.setCategory(newCategoryName);
        categoryRepository.save(category);

        return ResponseEntity.ok(CategoryDto.Update.builder()
                .categoryId(category.getCategoryId())
                .category(category.getCategory())
                .build());
    }


    @Transactional
    @DeleteMapping("/{studentId}/{categoryId}")
    public ResponseEntity<String> deleteFriend(
            @PathVariable("studentId") Long studentId, @PathVariable("categoryId") Long categoryId) {
        // 학번 예외 처리
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        // 카테고리 존재 유무 및 예외 처리
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)
        );

        // 카테고리 친구를 모두 기본으로 옮기고 삭제
        // 학생의 카테고리가 존재하지 않을경우 예외 처리
        List<Category> friendCategories = categoryRepository.findByStudent_StudentId(studentId);
        if (friendCategories.isEmpty()) {
            throw new CustomException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        // 기본 카테고리 지정
        Category fristCategory = friendCategories.get(0);

        // 기본 카테고리는 삭제 못함
        if (friendCategories.size() <= 1 || fristCategory.equals(category)) {
            throw new CustomException(ErrorCode.BASIC_CATEGORY);
        }

        // 삭제할 카테고리의 친구 List
        List<Friends> friends = friendsRepository.findByCategory_CategoryId(categoryId);

        // 삭제할 카테고리에 친구 존재할 경우
        // 기본 카테고리로 모두 이동
        if (!friends.isEmpty()) {
            for (Friends friend : friends
            ) {
                friendsService.updateFriend(studentId, friend.getFriendId(), fristCategory.getCategoryId());
            }
        }

        // 카테고리 삭제
        categoryRepository.delete(category);

        return ResponseEntity.ok("삭제완료");
    }


}
