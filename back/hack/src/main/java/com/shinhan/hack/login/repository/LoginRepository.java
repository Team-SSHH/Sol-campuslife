package com.shinhan.hack.login.repository;

import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.login.dto.StudentDto;
import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
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

    @Query("select s.studentId from student s")
    List<Long> findStudentId();

    @Query("select s.token from student s")
    List<String> findTokenAll();

    @Query("select s.nationality from student s where s.token = :token")
    List<String> findNationalityByToken(String token);

    @Modifying
    @Transactional
    @Query("UPDATE student s set s.latitude = :latitude, s.longitude = :longitude where s.studentId = :studentId")
    void setLatitudeAndLongitude(Long studentId, Double latitude, Double longitude);

    @Query("SELECT s.locationState from student s where s.studentId = :studentId")
    Boolean findLocationStateById(Long studentId);

    @Query("SELECT s from student s where s.studentId = :friendId and s.locationState = true")
    Optional<Student> findByIdAndLocationState(Long friendId);
}
