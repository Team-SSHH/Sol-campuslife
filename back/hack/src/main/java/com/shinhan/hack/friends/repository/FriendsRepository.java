package com.shinhan.hack.friends.repository;

import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendsRepository extends JpaRepository<Friends, Long> {
    List<Friends> findByStudentId(Long studentId);
}