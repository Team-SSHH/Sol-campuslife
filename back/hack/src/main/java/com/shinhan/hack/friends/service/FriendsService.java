package com.shinhan.hack.friends.service;

import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.repository.CategoryRepository;
import com.shinhan.hack.category.service.CategoryService;
import com.shinhan.hack.friends.dto.FriendsDto;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;

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

    public List<FriendsDto> getFriendsByStudent(Long studentid) {
        List<Category> categories= categoryRepository.findByStudent_StudentId(studentid);
        List<FriendsDto> friendsList= new ArrayList<>();
        for (Category category : categories) {
            List<Friends> friends=friendsRepository.findByCategory_CategoryId(category.getCategoryId());
            for(Friends friend: friends){
                Student friendStudent=studentRepository.findById(friend.getFriendId()).orElse(null);  // 추가된 부분

                if(friendStudent!=null){
                    StudentDto.Response friendInfo= StudentDto.Response.builder()
                            .studentId(friendStudent.getStudentId())
                            .name(friendStudent.getName())
                            .university(friendStudent.getUniversity())
                            .major(friendStudent.getMajor())
                            .grade(friendStudent.getGrade())
                            .gender(friendStudent.getGender())
                            .nationality(friendStudent.getNationality())
                            .bankNumber(friendStudent.getBankNumber())
                            .balance(friendStudent.getBalance())
                            .phoneId(friendStudent.getPhoneId())
                            .imageUrl(friendStudent.getImageUrl())
                            .build();


                    friendsList.add(new FriendsDto(friend.getFId(),category.getCategoryId(),category.getCategory(),studentid,friendInfo));
                }
            }
        }
        return friendsList;
    }

    @Transactional
    public List<FriendsDto> saveFriend(Long studentId, Long friendStudentId, Long categoryId) {
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        Student friendStudent = studentRepository.findById(friendStudentId).orElseThrow(() -> new RuntimeException("Friend not found"));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));

        List<Category> friendCategories = categoryRepository.findByStudent_StudentId(friendStudentId);
        Category firstCategory = null;
        if (!friendCategories.isEmpty()) {
            firstCategory = friendCategories.get(0);
        } else {
            System.out.println("친구가 카테고리에 없다.");
        }

        // 이미 있으면 에러
        Optional<Friends> existingFriendship1 = friendsRepository.findByCategory_CategoryIdAndFriendId(category.getCategoryId(), friendStudent.getStudentId());
        if (existingFriendship1.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 친구");
        }

        // 새로운 Friend 엔티티 생성 및 저장
        Friends friendship1 = new Friends();
        friendship1.setCategory(category);
        friendship1.setFriendId(friendStudent.getStudentId());
        System.out.println("friendship1 = " + friendship1);
        friendsRepository.save(friendship1);


        Optional<Friends> existingFriendship2 = friendsRepository.findByCategory_CategoryIdAndFriendId(firstCategory.getCategoryId(), student.getStudentId());

        if (existingFriendship2.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "이미 친구");
        }
//
        Friends friendship2 = new Friends();
        friendship2.setCategory(firstCategory);  // Assuming that both friends are in the same category
        friendship2.setFriendId(student.getStudentId());
        System.out.println("friendship2 = " + friendship2);

        friendsRepository.save(friendship2);
//


        // 업데이트된 친구 목록 반환
        return getFriendsByStudent(studentId);
    }


    @Transactional
    public List<FriendsDto> deleteFriend(Long studentId, Long friendStudentId) {
        // 친구 정보 찾기
        List<Friends> friends = friendsRepository.findByCategory_Student_StudentIdAndFriendId(studentId, friendStudentId);
        List<Friends> friends1 = friendsRepository.findByCategory_Student_StudentIdAndFriendId(friendStudentId, studentId);

        if (friends.isEmpty()) {
            throw new RuntimeException("Friend not found");
        }
        if (friends1.isEmpty()) {
            throw new RuntimeException("Friend not found");
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
        Student student = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("Student not found"));
        Student friendStudent = studentRepository.findById(friendStudentId).orElseThrow(() -> new RuntimeException("Friend not found"));
        Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));

        List<Friends> friends =  friendsRepository.findByCategory_Student_StudentIdAndFriendId(studentId, friendStudentId);


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