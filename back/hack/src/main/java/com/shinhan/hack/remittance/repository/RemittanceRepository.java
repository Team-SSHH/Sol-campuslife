package com.shinhan.hack.remittance.repository;

import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface RemittanceRepository extends JpaRepository<Student, Long> {

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE student s SET s.balance = (s.balance - :amount) where s.studentId = :studentId")
    int send(Long studentId, Long amount);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE student s SET s.balance = (s.balance + :amount) where s.studentId = :studentId")
    int receive(Long studentId, Long amount);
}
