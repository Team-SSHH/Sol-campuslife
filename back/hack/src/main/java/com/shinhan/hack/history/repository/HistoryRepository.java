package com.shinhan.hack.history.repository;

import com.shinhan.hack.history.entity.History;
import com.shinhan.hack.login.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

    List<History>findByStudent(Student student);
    List<History>findAll();
}