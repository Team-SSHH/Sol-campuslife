package com.shinhan.hack.login.repository;

import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends JpaRepository<Student, Long> {


    List<Student> findAll();
    @Query("select s from student s where s.studentId = :studentId and s.password = :password")
    Student findStudentByStudentIdAndPassword(Long studentId,String password);
}
