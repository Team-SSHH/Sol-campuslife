package com.shinhan.hack.friends.service;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.repository.CategoryRepository;
import com.shinhan.hack.category.service.CategoryService;
import com.shinhan.hack.friends.dto.FriendsDto;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;

import com.shinhan.hack.login.mapper.LoginMapper;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FriendsService {

    private final FriendsRepository friendsRepository;
    private final CategoryRepository categoryRepository;
    private final LoginRepository studentRepository;
    private final LoginMapper studentMapper;

    @Transactional
    public List<FriendsDto> getFriendsByStudent(Long studentid) {
        List<Category> categories = categoryRepository.findByStudent_StudentId(studentid);
        List<FriendsDto> friendsList = new ArrayList<>();

        for (Category category : categories) {
            List<Friends> friends = friendsRepository.findByCategory_CategoryId(category.getCategoryId());
            for (Friends friend : friends) {
                Student friendStudent = studentRepository.findById(friend.getFriendId()).orElseThrow(
                        () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
                );  // 추가된 부분
                StudentDto.Response friendInfo = studentMapper.toResponseDto(friendStudent);
                friendsList.add(FriendsDto.builder()
                        .fId(friend.getFId())
                        .categoryId(category.getCategoryId())
                        .category(category.getCategory())
                        .studentId(studentid)
                        .friend(friendInfo)
                        .build()
                );
            }
        }
        return friendsList;
    }

    @Transactional
    public List<FriendsDto> saveFriend(Long studentId, Long friendStudentId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        Student friendStudent = studentRepository.findById(friendStudentId).orElseThrow(
                () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
        );

        // 내가 친구를 저장
        // 내 카테고리들을 꺼내와서 첫번째 카테고리(기본)을 저장
        List<Category> myFriendCategories = categoryRepository.findByStudent_StudentId(studentId);
        Category myFirstCategory = null;
        if (!myFriendCategories.isEmpty()) {
            myFirstCategory = myFriendCategories.get(0);
        }

        // 모든 카테고리에서 친구를 검색하고 이미 있으면 에러
        for (Category cate : myFriendCategories
        ) {
            if (friendsRepository.findByCategory_CategoryIdAndFriendId(cate.getCategoryId(), friendStudent.getStudentId()).isPresent()) {
                throw new CustomException(ErrorCode.ALREADY_FRIEND);
            }
        }

        // 새로운 Friend 엔티티 생성 및 저장
        Friends friendship1 = Friends.builder()
                .category(myFirstCategory)
                .friendId(friendStudent.getStudentId())
                .build();
        friendsRepository.save(friendship1);

        // 친구가 나를 저장
        List<Category> friendsCategories = categoryRepository.findByStudent_StudentId(friendStudentId);
        Category frindsFirstCategory = null;
        if (!friendsCategories.isEmpty()) {
            frindsFirstCategory = friendsCategories.get(0);
        }

        for (Category cate : friendsCategories
        ) {
            if (friendsRepository.findByCategory_CategoryIdAndFriendId(frindsFirstCategory.getCategoryId(), student.getStudentId()).isPresent()) {
                throw new CustomException(ErrorCode.ALREADY_FRIEND);
            }
        }

        Friends friendship2 = new Friends();
        friendship2.setCategory(frindsFirstCategory);  // Assuming that both friends are in the same category
        friendship2.setFriendId(student.getStudentId());
        System.out.println("friendship2 = " + friendship2);

        friendsRepository.save(friendship2);

        // 업데이트된 친구 목록 반환
        return getFriendsByStudent(studentId);
    }


    @Transactional
    public List<FriendsDto> deleteFriend(Long studentId, Long friendStudentId) {
        // 친구 정보 찾기
        List<Friends> friends = friendsRepository.findByCategory_Student_StudentIdAndFriendId(studentId, friendStudentId);
        List<Friends> friends1 = friendsRepository.findByCategory_Student_StudentIdAndFriendId(friendStudentId, studentId);

        if (friends.isEmpty()) {
            throw new CustomException(ErrorCode.FRIEND_NOT_FOUNT);
        }
        if (friends1.isEmpty()) {
            throw new CustomException(ErrorCode.FRIEND_NOT_FOUNT);
        }

        // 모든 일치하는 친구 정보 삭제
        for (Friends friend : friends) {
            friendsRepository.delete(friend);
        }
        for (Friends friend1 : friends1) {
            friendsRepository.delete(friend1);
        }

        // 업데이트된 친구 목록 반환
        return getFriendsByStudent(studentId);
    }


    @Transactional
    public List<FriendsDto> updateFriend(Long studentId, Long friendStudentId, Long categoryId) {
        Student student = studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        Student friendStudent = studentRepository.findById(friendStudentId).orElseThrow(
                () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
        );
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)
        );

        List<Friends> friends = friendsRepository.findByCategory_Student_StudentIdAndFriendId(studentId, friendStudentId);


        for (Friends friend : friends) {
            // Update the category of each Friends object
            friend.setCategory(category);

            // Save the updated Friends object
            friendsRepository.save(friend);
        }

        // 업데이트된 친구 목록 반환
        return getFriendsByStudent(studentId);
    }
}