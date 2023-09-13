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
        List<Category> categories = categoryRepository.findByStudent_StudentId(studentId);
        List<CategoryDto.Response> categoryList = new ArrayList<>();
        for (Category category : categories
        ) {
            CategoryDto.Response categoryResponse = new CategoryDto.Response();
            categoryResponse.setCategoryId(category.getCategoryId());
            categoryResponse.setCategory(category.getCategory());
            categoryResponse.setStudentId(studentId); // 내 학생 ID 설정
            System.out.println("categoryResponse = " + categoryResponse);
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

        return new ResponseEntity<>(categoryList, HttpStatus.OK);
    }


    @PostMapping("/{studentId}")
    public ResponseEntity<CategoryDto> addCategory(@PathVariable("studentId") Long studentId, @RequestBody Map<String, String> body) {
        String categoryName = body.get("categoryName");

        List<Category> existingCategories = categoryRepository.findByCategory(categoryName);
        if (!existingCategories.isEmpty()) {
            throw new CustomException(ErrorCode.ALREADY_CATEGORY);
        }

        // 새 카테고리 생성
        Category newCategory = Category.builder()
                .category(categoryName)
                .build();

        Student student = new Student();
        student.setStudentId(studentId);
        newCategory.setStudent(student);

        Category savedCategory = categoryRepository.save(newCategory);

        // Convert the saved category to DTO
        CategoryDto savedCategoryDto = new CategoryDto();
        savedCategoryDto.setCategoryId(savedCategory.getCategoryId());
        savedCategoryDto.setCategory(savedCategory.getCategory());

        return ResponseEntity.ok(savedCategoryDto);
    }


    @PutMapping("/{studentId}")
    public ResponseEntity<CategoryDto> updateCategory(@PathVariable("studentId") Long studentId, @RequestBody CategoryDto categoryUpdate) {
        Long categoryId = categoryUpdate.getCategoryId();
        String newCategoryName = categoryUpdate.getCategory();

        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)
        );

        System.out.println("category = " + category);

        List<Category> existingCategories = categoryRepository.findByCategory(newCategoryName);
        System.out.println("existingCategories = " + existingCategories);
        if (!existingCategories.isEmpty()) {
            throw new CustomException(ErrorCode.ALREADY_CATEGORY);
        }

        category.setCategory(newCategoryName);
        Category updatedCategroy = categoryRepository.save(category);

        CategoryDto updatedCategroyDto = new CategoryDto();
        updatedCategroyDto.setCategoryId(updatedCategroy.getCategoryId());
        updatedCategroyDto.setCategory(updatedCategroy.getCategory());

        return ResponseEntity.ok(updatedCategroyDto);
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
        if(friendCategories.isEmpty()){
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
        if(!friends.isEmpty()){
            for (Friends friend:friends
                 ) {
                friendsService.updateFriend(studentId, friend.getFriendId(), fristCategory.getCategoryId());
            }
        }

        // 카테고리 삭제
        categoryRepository.delete(category);

        return new ResponseEntity<>("삭제완료", HttpStatus.OK);
    }


}
