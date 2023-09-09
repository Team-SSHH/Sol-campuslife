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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendsService {

    private final FriendsRepository friendsRepository;
    private final CategoryRepository categoryRepository;
    private final LoginRepository studentRepository;

    public List<FriendsDto> getFriendsByStudent(Long studentid) {
        List<Category> categories= categoryRepository.findByStudent_StudentId(studentid);
        System.out.println("categories= " + categories);
        List<FriendsDto> friendsList= new ArrayList<>();
        for (Category category : categories) {
            System.out.println("categoryId= " + category.getCategoryId());
            List<Friends> friends=friendsRepository.findByCategory_CategoryId(category.getCategoryId());
            for(Friends friend: friends){
                Student friendStudent=studentRepository.findById(friend.getFriendId()).orElse(null);  // 추가된 부분

                if(friendStudent!=null){
                    StudentDto.Response friendInfo=new StudentDto.Response(
                            friendStudent.getStudentId(),
                            friendStudent.getName(),
                            friendStudent.getUniversity(),
                            friendStudent.getMajor(),
                            friendStudent.getGrade(),
                            friendStudent.getGender(),
                            friendStudent.getNationality(),
                            friendStudent.getBankNumber(),
                            friendStudent.getBalance(),
                            friendStudent.getPhoneId()
                    );

                    friendsList.add(new FriendsDto(friend.getFId(),category.getCategoryId(),category.getCategory(),studentid,friendInfo));
                }
            }
        }
        return friendsList;
    }

}