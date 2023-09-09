package com.shinhan.hack.category.repository;

import com.shinhan.hack.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByStudent_StudentId(Long studentId);
}