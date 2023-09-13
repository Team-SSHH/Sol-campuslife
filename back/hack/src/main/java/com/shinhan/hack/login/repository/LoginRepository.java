package com.shinhan.hack.login.repository;

import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoginRepository extends JpaRepository<Student, Long> {

    List<Student> findAll();


    Optional<Student> findStudentByStudentId(Long studentId);


    @Query("select s from student s where s.studentId = :studentId and s.password = :password")
    Optional<Student> findStudentByStudentIdAndPassword(Long studentId, String password);

    @Query("select s.balance from student s where s.studentId = :studentId")
    Optional<Long> findBalanceByStudentId(Long studentId);
}
