package com.shinhan.hack.friends.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Friends {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "f_id")
    private Long fId;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    Category category;


    @Column(name = "freind_id", nullable = false)
    private Long friendId;
}
