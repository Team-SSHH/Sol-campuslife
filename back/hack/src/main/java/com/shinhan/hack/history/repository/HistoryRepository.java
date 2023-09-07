package com.shinhan.hack.history.repository;

import com.shinhan.hack.history.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {

//   단일 학생의 소비로그를 조회하기 위한 탐색
//    List<History> findByStudent_StudentId(int studentId);
}