package com.shinhan.hack.login.repository;

import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Student, Integer> {

    @Query("select s from student s where s.studentId = :studentId and s.password = :password")
    Student findStudentByStudentIdAndPassword(Integer studentId,String password);
}
