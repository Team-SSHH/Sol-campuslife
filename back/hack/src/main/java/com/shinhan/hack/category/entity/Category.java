package com.shinhan.hack.category.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.shinhan.hack.friends.entity.Friends;
import com.shinhan.hack.login.entity.Student;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Long categoryId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    Student student;

    @Column(name = "category", nullable = false)
    private String category;



}
