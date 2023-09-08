package com.shinhan.hack.smartId.repository;

import com.shinhan.hack.login.entity.Student;
import com.shinhan.hack.smartId.entity.SmartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmartIdRepository extends JpaRepository<SmartId, Long> {
    SmartId findByStudent(Student studentId);
}
