package com.shinhan.hack.freinds.entity;

import com.shinhan.hack.category.entity.Category;
import com.shinhan.hack.login.entity.Student;
import lombok.*;

import javax.persistence.*;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Freinds {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id")
    private Long fId;

    @ManyToOne
    @JoinColumn(nullable = false, name = "category_id", referencedColumnName = "category_id")
    Category category;

    @ManyToOne
    @JoinColumn(nullable = false, name = "student_id", referencedColumnName = "student_id")
    Student student;

    @Column(name = "freind_id", nullable = false)
    private Long freindId;
}
