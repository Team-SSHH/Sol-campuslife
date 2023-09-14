package com.shinhan.hack.category.controller;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.category.dto.CategoryDto;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.repository.CategoryRepository;
import com.shinhan.hack.category.service.CategoryService;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.friends.service.FriendsService;
import com.shinhan.hack.login.repository.LoginRepository;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/sshh/category")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "https://sh.solcampuslife.store"}, allowCredentials = "true", allowedHeaders = "*", methods = {
        RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS, RequestMethod.HEAD, RequestMethod.DELETE,
        RequestMethod.PUT})
public class CategoryController {

    private final FriendsService friendsService;
    private final CategoryService categoryService;

    private final FriendsRepository friendsRepository;
    private final CategoryRepository categoryRepository;
    private final LoginRepository  studentRepoaitory;

    @GetMapping("/{studentId}")
    public ResponseEntity<List<CategoryDto.Response>> getCategory(
            @PathVariable("studentId") Long studentId
    ) {
        // 학생 존재 여부 예외 처리
        studentRepoaitory.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        List<CategoryDto.Response> categoryList = categoryService.getCategoryList(studentId);

        return ResponseEntity.ok(categoryList);
    }


    @PostMapping("/{studentId}")
    public ResponseEntity<CategoryDto.Update> addCategory(
            @PathVariable("studentId") Long studentId,
            @RequestBody CategoryDto.Post categoryDtoPost
    ) {
        // 학생 존재 여부 예외 처리
        studentRepoaitory.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        String categoryName = categoryDtoPost.getCategoryName();

        // 추가할 카테고리명이 학생의 카테고리 중에 있는지 확인 및 예외처리
        List<Category> existingCategories = categoryRepository.findByCategoryAndStudent_StudentId(categoryName, studentId);

        if (!existingCategories.isEmpty()) {
            throw new CustomException(ErrorCode.ALREADY_CATEGORY);
        }

        CategoryDto.Update savedCategoryDto = categoryService.addCategory(categoryName, studentId);

        return ResponseEntity.ok(savedCategoryDto);
    }


    @PutMapping("/{studentId}")
    public ResponseEntity<CategoryDto.Update> updateCategory(
            @PathVariable("studentId") Long studentId,
            @RequestBody @NotNull CategoryDto.Update categoryUpdate
    ) {
        // 학생 존재 여부 예외 처리
        studentRepoaitory.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 받아온 값 저장
        Long categoryId = categoryUpdate.getCategoryId();
        String newCategoryName = categoryUpdate.getCategory();

        // 추가할 카테고리명이 학생의 카테고리 중에 있는지 확인 및 예외처리
        List<Category> existingCategories = categoryRepository.findByCategoryAndStudent_StudentId(newCategoryName, studentId);

        if (!existingCategories.isEmpty()) {
            throw new CustomException(ErrorCode.ALREADY_CATEGORY);
        }

        CategoryDto.Update update = categoryService.updateCategory(categoryId, newCategoryName);

        return ResponseEntity.ok(update);
    }


    @Transactional
    @DeleteMapping("/{studentId}/{categoryId}")
    public ResponseEntity<String> deleteFriend(
            @PathVariable("studentId") Long studentId, @PathVariable("categoryId") Long categoryId) {
        // 학번 예외 처리
        studentRepoaitory.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );

        // 카테고리 존재 유무 및 예외 처리
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)
        );

        // 학생 아이디로 카테고리 리스트 확인 -> 적어도 하나는 있어야 함.
        List<Category> friendCategories = categoryRepository.findByStudent_StudentId(studentId);

        if (friendCategories.isEmpty()) {
            throw new CustomException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        // 기본 카테고리 지정
        Category fristCategory = friendCategories.get(0);

        // 카테고리 친구를 모두 기본으로 옮기고 삭제
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
