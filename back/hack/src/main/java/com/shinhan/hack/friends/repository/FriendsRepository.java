package com.shinhan.hack.friends.repository;

import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {
    List<Friends> findByCategory_CategoryId(Long categoryId);
//    List<Friends> findByfriendId_CategoryId(Long categoryId);
    List<Friends> findByCategory_Student_StudentIdAndFriendId(Long studentId, Long friendStudentId);
    Optional<Friends> findByCategory_CategoryIdAndFriendId(Long categoryId, Long friendId);

    List<Friends> findByFriendId(Long friendStudentId);
}