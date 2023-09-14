package com.shinhan.hack.friends.service;

import com.shinhan.hack.Error.CustomException;
import com.shinhan.hack.Error.ErrorCode;
import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.repository.CategoryRepository;
import com.shinhan.hack.friends.dto.FriendsDto;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;

import com.shinhan.hack.login.mapper.LoginMapper;
import com.shinhan.hack.login.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class FriendsService {

    private final FriendsRepository friendsRepository;
    private final CategoryRepository categoryRepository;
    private final LoginRepository studentRepository;

    private final LoginMapper studentMapper;

    @Transactional
    public List<FriendsDto> getFriendsByStudent(Long studentId) {
        List<Category> categories = categoryRepository.findByStudent_StudentId(studentId);
        List<FriendsDto> friendsList = new ArrayList<>();

        for (Category category : categories) {
            List<Friends> friends = friendsRepository.findByCategory_CategoryId(category.getCategoryId());
            for (Friends friend : friends) {

                Student friendStudent = studentRepository.findById(friend.getFriendId()).orElseThrow(
                        () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
                );

                StudentDto.Response friendInfo = studentMapper.toResponseDto(friendStudent);

                friendsList.add(FriendsDto.builder()
                        .fId(friend.getFId())
                        .categoryId(category.getCategoryId())
                        .category(category.getCategory())
                        .studentId(studentId)
                        .friend(friendInfo)
                        .build()
                );
            }
        }
        return friendsList;
    }

    @Transactional
    public void saveFriend(Long studentId, Long friendStudentId) {

        // 내가 친구를 저장
        // 내 카테고리들을 꺼내와서 첫번째 카테고리(기본)을 저장
        // 학생 아이디로 카테고리 리스트 확인 -> 적어도 하나는 있어야 함.
        List<Category> friendCategories = categoryRepository.findByStudent_StudentId(studentId);

        if (friendCategories.isEmpty()) {
            throw new CustomException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        Category myFirstCategory = friendCategories.get(0);

        // 모든 카테고리에서 친구를 검색하고 이미 있으면 에러
        for (Category cate : friendCategories
        ) {
            if (friendsRepository.findByCategory_CategoryIdAndFriendId(cate.getCategoryId(), friendStudentId).isPresent()) {
                throw new CustomException(ErrorCode.ALREADY_FRIEND);
            }
        }

        // 새로운 Friend 엔티티 생성
        Friends friendship1 = Friends.builder()
                .category(myFirstCategory)
                .friendId(friendStudentId)
                .build();

        // 저장
        friendsRepository.save(friendship1);

    }

    @Transactional
    public List<FriendsDto> deleteFriend(Long studentId, Long friendStudentId) {
        // 친구 정보 찾기
        List<Friends> friends = friendsRepository.findByCategory_Student_StudentIdAndFriendId(studentId, friendStudentId);

        if (friends.isEmpty()) {
            throw new CustomException(ErrorCode.FRIEND_NOT_FOUNT);
        }

        // 모든 일치하는 친구 정보 삭제
        for (Friends friend : friends) {
            friendsRepository.deleteALL(friend);
        }

        // 업데이트된 친구 목록 반환
        return getFriendsByStudent(studentId);
    }


    @Transactional
    public List<FriendsDto> updateFriend(Long studentId, Long friendStudentId, Long categoryId) {
        studentRepository.findById(studentId).orElseThrow(
                () -> new CustomException(ErrorCode.MEMBER_NOT_FOUND)
        );
        studentRepository.findById(friendStudentId).orElseThrow(
                () -> new CustomException(ErrorCode.FRIEND_NOT_FOUNT)
        );
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new CustomException(ErrorCode.CATEGORY_NOT_FOUND)
        );

        // 친구관계가 존재하는지 확인.
        List<Friends> friends = friendsRepository.findByCategory_Student_StudentIdAndFriendId(studentId, friendStudentId);

        if(friends.isEmpty()){
            throw new CustomException(ErrorCode.FRIEND_NOT_FOUNT);
        }

        for (Friends friend : friends) {
            if(!Objects.equals(friend.getCategory().getStudent().getStudentId(), category.getStudent().getStudentId())) {
                throw new CustomException(ErrorCode.DIFFERENT_STUDENT_CATEGORY);
            }
            // Update the category of each Friends object
            friend.setCategory(category);

            // Save the updated Friends object
            friendsRepository.save(friend);
        }

        // 업데이트된 친구 목록 반환
        return getFriendsByStudent(studentId);
    }
}