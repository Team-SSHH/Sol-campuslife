package com.shinhan.hack.friends.service;

import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.service.CategoryService;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.smartId.entity.SmartId;
import com.shinhan.hack.smartId.service.SmartIdService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class FriendsService {
    private final FriendsRepository friendsRepository;
    private final CategoryService categoryService;
    private final SmartIdService smartIdService;
    @Transactional
    public void addFriend(Long studentId, Long friendStudentId) {
//        Category category = categoryService.getCategoryById(categoryId);
//        SmartId smartID = smartIdService.getSmartID(smartID);
        System.out.println("studentId = " + studentId);
        System.out.println("friendStudentId = " + friendStudentId);
//        SmartId smartID = smartIdService.getSmartId(student);
//        Friends newFriend = Friends.builder()
//                .category(category)
//                .student(student)
//                .friend(friend)
//                .smartID(smartID)
//                .build();

//        friendsRepository.save(newFriend);
        // 여기에 친구 등록 로직을 작성하세요.
        // 예를 들어, Friends 엔티티 객체를 생성하여 friendsRepository.save() 메서드로 저장할 수 있습니다.
    }
}
