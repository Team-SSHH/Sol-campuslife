package com.shinhan.hack.friends.service;

import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.category.service.CategoryService;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.friends.repository.FriendsRepository;
import com.shinhan.hack.login.entity.Student;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendsService {
    private final FriendsRepository friendsRepository;

    public List<Friends> getFriendsByStudentId(Long studentId) {
        return friendsRepository.findByStudentId(studentId);
    }
}

//
//@Service
//@RequiredArgsConstructor
//public class FriendsService {
//    private final FriendsRepository friendsRepository;
//    private final CategoryService categoryService;
//    private final SmartIdService smartIdService;
//    @Transactional
//    public void addFriend(Long studentId, Long friendStudentId, Long categoryId) {
////        Category category = categoryService.getCategoryById(1L);
////        SmartId smartID = smartIdService.getSmartID(smartID);
//        System.out.println("studentId = " + studentId);
//        System.out.println("friendStudentId = " + friendStudentId);
//        System.out.println("categoryId = " + categoryId);
//        SmartId smartID = smartIdService.getSmartId(studentId);
//        System.out.println("smartID = " + smartID.getCardId());
//
////        Friends newFriend = Friends.builder()
////                .category(1L)
////                .student(studentId)
////                .friend(friendStudentId)
////                .smartID(smartID)
////                .build();
//
////        SmartId smartID = smartIdService.getSmartId(student);
////        Friends newFriend = Friends.builder()
////                .category(category)
////                .student(student)
////                .friend(friend)
////                .smartID(smartID)
////                .build();
//
////        friendsRepository.save(newFriend);
//        // 여기에 친구 등록 로직을 작성하세요.
//        // 예를 들어, Friends 엔티티 객체를 생성하여 friendsRepository.save() 메서드로 저장할 수 있습니다.
//    }
//}

